# Formalist Standard React

A library of standard form elements for `Formalist`.

`formalist-standard-react` transforms an AST into DOM elements.

#### Example

An example AST for a username/password login form.

```js
// data.js

export default  = [
  [
    "field",
    [
      "username",
      "string",
      "default",
      null,
      [
        [
          "predicate",
          [
            "filled?",
            []
          ]
        ]
      ],
      [],
      [
        [
          "label",
          "Username"
        ],
        [
          "placeholder",
          "Enter your username"
        ]
      ]
    ]
  ],
  [
    "field",
    [
      "password",
      "string",
      "default",
      null,
      [
        [
          "predicate",
          [
            "filled?",
            []
          ]
        ]
      ],
      [],
      [
        [
          "label",
          "Password"
        ],
        [
          "placeholder",
          "Enter your password"
        ],
        [
          "password",
          true
        ],
        [
          "inline",
          true
        ]
      ]
    ]
  ]
]
```

We pass the `AST` to our formalist `template` and call `render()`.

```js
import template from 'formalist-standard-react'
import ReactDOM from 'react-dom'
import AST from './data.js'

const fields = template()(AST)

class MyForm extends Component {
  render () {
    return (
      <form onSubmit={ this.handle }>
        { fields.render() }
        <button>Log in</button>
      </form>
    )
  }

  handle (e) {
    e.preventDefault
  }
}

ReactDOM.render(<MyForm />, node);
```

## Abstract Syntax Tree (AST)

Each field is defined as an array of the overall AST.


```
[
  "field",
  [
    // the field's id attribute value
    "username",

    // component type (string, int, bool, date, float, decimal etc)
    "string",

    // field type (default, textarea, select or radio)
    "default",

    // default value e.g. "hello" (for default or textarea field types)
    null,

    // validation rules (RAILS SPECIFIC ?) else []
    [
      [
        "predicate",
        [
          "filled?",
          []
        ]
      ]
    ],

    // error messages e.g. "This field cannot be empty"
    [],

    // label tag and placeholder attribute
    // option_values for select / radio elements
    [
      [
        "label",
        "Username"
      ],
      [
        "placeholder",
        "Enter your username"
      ],
      [
        "option_values",
        [
          "one",
          "two"
          "three"
        ]
      ]
    ]
  ]
]
```

### Field display attributes

| Key | Description | Type | Options  | Example |
| -- |:-- |:--:| :-- | --:|
| **label** | | `String` | | [ "label", "Username" ] |
| **placeholder** | | `String` | | [ "placeholder", "Please enter your username" ] |
| **inline** | Render a label and input inline | `Boolean` | true, false | [ "inline", true ] |
| **option_values** | Options for a select group of radios buttons / checkboxs | key/value | [1, "one"] | [ "option_values", [ [1, "one"], [2, "two"] ]] |
| | | value | "One" | [ "option_values", [ "One", "Two", "Three" ]] |
| **display_options** | | `String` | "code", "foo", "bar" | [ "display_options", ["code"]] |
| **hint** | | `String` | |  [ "hint", "You can enter text over more than one line." ] |
| **question_text** | Include an additional `String` for this input | `String` | |  [ "question_text", "Do you agree?" ] |
| **size** | | `String` | "huge", "foo", "bar" |  [ "size", "huge" ] |
| **min** | Specify the minimum value for an input | `Int` / `String` | number or date string |  [ "min", 10 ] |
| **max** | Specify the maximum value for an input | `Int` / `String` | number or date string |  [ "max", 30 ] |
| **step** | Specify the legal number intervals for an input | `Int` / `Float` | |  [ "step", 0.25 ] |

```
[
  "field",
  [
    "string_select",
    "string",
    "select",
    null,
    [],
    [],
    [
      [
        "label",
        "String (select)"
      ],
      [
        "placeholder",
        "Select your favourite number"
      ],
      [
        "option_values",
        [
          "One",
          "Two",
          "Three"
        ]
      ]
    ]
  ]
]
```

## Field rules and error messaging

We can include validation for a field by populating the `predicate` array with
rules that must be met.

If this rule is not met, the `String` message in the `error` array will display.   This will automatically apply error classes/styles to the field element.

In the following example, we check that the field was `filled`.

```
[
  "field",
  [
    "decimal_radio",
    "decimal",
    "radio",
    null,
    [
      "predicate",
      [
        "filled?",
        []
      ]
    ],
    [
      "decimal_radio must be filled" // Error message
    ],
    [
      [
        "label",
        "Decimal (radio)"
      ],
      [
        "option_values",
        [
          [
            1.1,
            "1.1"
          ],
          [
            2.4,
            "2.4"
          ],
          [
            3.14159265359,
            "Ï€"
          ]
        ]
      ],
      [
        "hint", "You'll need to select a radio button"
      ]
    ]
  ]
]
```

We can also have multiple rules that must be met.  
In the following example the the field must be `filled` and be of `date_time`.

```
[
  "field",
  [
    "datetime_default",
    "date_time",
    "default",
    null,
    [
      [
        "and",
        [
          [
            "predicate",
            [
              "filled?",
              []
            ]
          ],
          [
            "predicate",
            [
              "date_time?",
              []
            ]
          ]
        ]
      ]
    ],
    [
      "datetime_default must be filled"
    ],
    [
      [
        "label",
        "Date-time (default)"
      ]
    ]
  ]
]
```

### Grouping field elements

To group multiple fields you can nest them within a `section`.

```
[
  "section",
  [
    "string",
    [], // no idea what this is or does
    [
      [
        "field",
        [
          "username",
          "string",
          "default",
          null,
          [
            [
              "predicate",
              [
                "filled?",
                []
              ]
            ]
          ],
          [],
          [
            [
              "label",
              "Username"
            ],
            [
              "placeholder",
              "Enter your username"
            ]
          ]
        ]
      ],
      [
        "field",
        [
          "password",
          "string",
          "default",
          null,
          [
            [
              "predicate",
              [
                "filled?",
                []
              ]
            ]
          ],
          [],
          [
            [
              "label",
              "Password"
            ],
            [
              "placeholder",
              "Enter your password"
            ],
            [
              "password",
              true
            ],
            [
              "inline",
              true
            ]
          ]
        ]
      ]
    ]
  ]
]
```

## CSS

Assumes you’re using a global `reset` like [Eric Meyer’s 2.0 version](http://meyerweb.com/eric/tools/css/reset/).

The CSS in this project is required to be compiled as [CSS Modules](https://github.com/css-modules/css-modules). It makes no opinions about the compilation of your CSS apart from that, so you can configure your build tool of choice as you like.

## Testing

```
npm run test
```

Tests are compiled on the fly from `./test` and piped through `tape`.

Note: CSS references are transformed into CSS Modules for testing using `babel-plugin-css-modules-transform` so we can test things properly. The CSS itself isn’t generated — it just disppears into the ether.
