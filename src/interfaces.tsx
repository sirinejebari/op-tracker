export interface FiltersInterface  {reference: string, operator: string, status: string}

export  interface MessageInterface {title: string; message: string; type: string, msgKey: string}

export interface ServerEvent {
    reference: string;
    operator: string;
    subtype: string;
    short: string;
    description: string;
    date: string
}
