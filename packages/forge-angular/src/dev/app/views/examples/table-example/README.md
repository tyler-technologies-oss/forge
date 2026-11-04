# To regenerate test data, use this site and the following JSON structure:

[JSON Generator](https://json-generator.com)

```json
[
  '{{repeat(250)}}',
  {
    number: '{{index(1)}}',
    year: '{{integer(2017, 2020)}}',
    month: '{{integer(1, 12)}}',
    effectiveDate: '{{date(new Date(2017, 0, 1), new Date(), "ISODateTimeTZ")}}',
    source: function() {
		var sources = ['GNI', 'ENC', 'BUA', 'GEN'];
      	return sources[Math.floor(Math.random() * sources.length)];
    },
    status: '{{integer(1, 5)}}',
    enteredBy: '{{firstName()}} {{surname()}}',
    description: '{{lorem(2, "words")}}',
    debits: '{{floating(0, 10000, 2)}}',
    credits: '{{floating(0, 10000, 2)}}',
    attachments: '{{bool()}}'
  }
]
```
