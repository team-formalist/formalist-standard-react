const simple = [
  [
    'field',
    [
      'field_one_name',
      'string',
      '123',
      [
        ['label', 'Field one name'],
        ['display_variant', 'select'],
        ['option_values', [
          ['123', '123'], ['234', '234'], ['456', '456']
        ]]
      ],
      [
        [
          ['error_name', 'error name'],
          ['error_message', 'error message']
        ],
        [
          ['error_name', 'error name two'],
          ['error_message', 'error message two']
        ]
      ]
    ]
  ],
  [
    'field',
    [
      'field_two_name',
      'string',
      'Title goes here',
      [
        ['display_options', ['code']]
      ]
    ]
  ],
  [
    'section',
    [
      'Main section',
      [
        [
          'field',
          [
            'field_three_name',
            'string',
            '321',
            []
          ]
        ],
        [
          'field',
          [
            'field_four_name',
            'string',
            'Content goes here',
            []
          ]
        ]
      ]
    ]
  ],
  [
    'field',
    [
      'field_int_name',
      'int',
      123,
      [
        ['step', 2]
      ]
    ]
  ],
  [
    'field',
    [
      'field_int_as_select',
      'int',
      5,
      [
        ['display_variant', 'select'],
        ['option_values', [
          [1, 'Top right'],
          [2, 'Top center'],
          [3, 'Top right'],
          [4, 'Middle right'],
          [5, 'Middle center'],
          [6, 'Middle right'],
          [7, 'Bottom right'],
          [8, 'Bottom center'],
          [9, 'Bottom right']
        ]]
      ]
    ]
  ],
  [
    'field',
    [
      'field_string_as_radio',
      'string',
      'left',
      [
        ['display_variant', 'radio'],
        ['option_values', [
          ['left', 'Left'], ['right', 'Right']
        ]]
      ]
    ]
  ],
  [
    'field',
    [
      'field_int_as_radio',
      'int',
      5,
      [
        ['display_variant', 'radio'],
        ['option_values', [
          [1, 'Top right'],
          [2, 'Top center'],
          [3, 'Top right'],
          [4, 'Middle right'],
          [5, 'Middle center'],
          [6, 'Middle right'],
          [7, 'Bottom right'],
          [8, 'Bottom center'],
          [9, 'Bottom right']
        ]]
      ]
    ]
  ],
  [
    'field',
    [
      'field_float_as_radio',
      'float',
      5,
      [
        ['display_variant', 'radio'],
        ['option_values', [
          [1, 'Top right'],
          [2, 'Top center'],
          [3, 'Top right'],
          [4, 'Middle right'],
          [5, 'Middle center'],
          [6, 'Middle right'],
          [7, 'Bottom right'],
          [8, 'Bottom center'],
          [9, 'Bottom right']
        ]]
      ]
    ]
  ],
]

export default simple
