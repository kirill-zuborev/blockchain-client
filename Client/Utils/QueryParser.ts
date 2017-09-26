import { stringify as stringifyQuery, parse as parseQuery, ParseOptions, StringifyOptions} from 'query-string';

export function parse<T>(str: string, queryShema: QueryShema, options?: ParseOptions): T {
    let parsedQuery = parseQuery(str, options);

    let parser = new FilterParser<T>(parsedQuery, queryShema);

    return parser.getFilter();
}

export function stringify(obj: object, options?: StringifyOptions): string {
    let queryParser = new QueryParser(obj);

    let inlineObject = queryParser.parseToInlineObject()

    return stringifyQuery(inlineObject, options);
}

export type StringifyOptions = StringifyOptions;
export type ParseOptions = ParseOptions;
export type QueryParameter = { name: string, type?: string };
export type QueryShema = QueryParameter[];

class FilterParser<T> {
    private readonly parsedQuery: any;
    private readonly queryShema: QueryShema;

    constructor(parsedQuery: any, queryShema: QueryShema) {
        this.parsedQuery = parsedQuery;
        this.queryShema = queryShema;
    }

    public getFilter(): T {
        let props = Reflect.ownKeys(this.parsedQuery);

        let filter = {};

        props.map(prop => this.parsePropertyToFilter(prop, filter));

        return filter as T;
    }

    private parsePropertyToFilter(prop: PropertyKey, filter) {
        let path = prop.toString().split(".")

        let obj = filter;

        for (var i = 0; i < path.length; i++) {
            let stepName = path[i];
            let isLastStep = i == path.length - 1;
            let nextStep = Reflect.get(obj, stepName);

            if (nextStep && isLastStep) {
                break;
            } else if (nextStep) {
                obj = nextStep;
                continue;
            }

            Reflect.set(obj, stepName, this.getValue(isLastStep, stepName, prop));

            obj = Reflect.get(obj, stepName);
        }
    }

    private getValue(isLastStep: boolean, stepName: string, propertyKey: PropertyKey) {
        if (isLastStep) {
            if (this.queryShema && this.queryShema.some(c => c.name == stepName)) {
                return this.convert(Reflect.get(this.parsedQuery, propertyKey), this.queryShema.find(c => c.name == stepName).type);
            } else {
                return this.convert(Reflect.get(this.parsedQuery, propertyKey))
            }
        } else {
            return {};
        }
    }

    private convert(val: any, type: string = 'string') {
        switch (type) {
            case "string":
                return val as string;
            case "number":
                return parseFloat(val);
            case "boolean":
                return val == "true"
            default:
                return val as string;
        }
    }
}

class QueryParser {
    private filter: any;

    constructor(filter: any) {
        this.filter = filter;
    }

    parseToInlineObject() {
        let result = {};

        let props = [];

        this.parseProp("", this.filter, props);

        props.forEach(prop => {
            Reflect.set(result, prop.name, prop.value);
        });

        return result;
    }

    private parseProp(name: string, value, res) {
        if (typeof value == 'object') {
            let props = Reflect.ownKeys(value);

            props.forEach((prop) => {
                let fullName = name ? `${name}.${prop.toString()}` : prop.toString();

                this.parseProp(fullName, Reflect.get(value, prop), res)
            });
        } else {
            res.push({ name, value });
        }
    }
}