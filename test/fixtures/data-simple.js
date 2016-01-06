const simple = [
  [
    'field',
    [
      'field_one_name',
      'string',
      '123',
      [
        'error message one', 'error message two'
      ],
      [
        ['label', 'Field one name'],
        ['display_variant', 'select'],
        ['option_values', [
          ['123', '123'], ['234', '234'], ['456', '456']
        ]]
      ]
    ]
  ],
  [
    'field',
    [
      'field_two_name',
      'string',
      'Title goes here',
      [],
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
            [],
            []
          ]
        ],
        [
          'field',
          [
            'field_four_name',
            'string',
            'Content goes here',
            [],
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
      [],
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
      [],
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
      [],
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
      [],
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
      0.5,
      [],
      [
        ['display_variant', 'radio'],
        ['option_values', [
          [0.1, 'Top right'],
          [0.2, 'Top center'],
          [0.3, 'Top right'],
          [0.4, 'Middle right'],
          [0.5, 'Middle center'],
          [0.6, 'Middle right'],
          [0.7, 'Bottom right'],
          [0.8, 'Bottom center'],
          [0.9, 'Bottom right']
        ]]
      ]
    ]
  ],
  [
    'field',
    [
      'field_decimal',
      'decimal',
      5.5,
      [],
      []
    ]
  ],
  [
    'field',
    [
      'field_bool',
      'bool',
      false,
      [],
      [
        ['question_text', 'Is boolean?']
      ]
    ]
  ]
]

export default simple
