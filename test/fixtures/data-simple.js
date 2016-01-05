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
  ]
]

export default simple
