/**
 * Utility class for parsing inline JSX inside view component
 */

 class TSXFactory {
    /**
     * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
     * @param tag HTML node tag 
     * @param attrs Attribute list for the tag 
     * @param children Elements/Tags as child in DOM tree heirarchy
     * @returns HTML Element to be rendered in DOM
     */
    public createElement (tag: string, attrs: any, children: any): HTMLElement {
        var element: HTMLElement = document.createElement(tag);
        for (let name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                var value: string | null | boolean = attrs[name];
                if (value === true) {
                    element.setAttribute(name, name);
                } else if (value !== false && value != null) {
                    element.setAttribute(name, value.toString());
                }
            }
        }
        for (let i:number = 2; i < arguments.length; i++) {
            let child:any = arguments[i];
            if (child instanceof Array) {
                child.forEach(c => {
                    element.appendChild(
                        c.nodeType == null ?
                            document.createTextNode(c.toString()) : c);
                });
            } else {
                element.appendChild(
                    child.nodeType == null ?
                        document.createTextNode(child.toString()) : child);    
            }
        }
        return element;
    }
}


declare global {
    namespace JSX {
        /**
         * List all the HTML tags will be considered by this parser from JSX to actual DOM element
         */
        interface IntrinsicElements {
            input: any,
            select: any,
            div : any,
            h1: any,
            label : any,
            button : any,
            i : any,
            span : any,
            ul : any,
            li : any,
            a : any,
            p : any,
            h2: any,
            h3: any,
            h4: any,
            h5: any,
            hr: any,
            form: any,
            nav: any,
            option: any,
            img: any,
            br :any,
            ol :any,
            tr : any,
            td: any,
            thead:any,
            tbody :any,
            table : any,
            section: any,
            small: any,
            h6: any,
            textarea: any,
            b: any
        }
    }
}

export var myOwnTSX: TSXFactory = new TSXFactory();