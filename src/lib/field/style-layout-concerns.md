## Attrs that effect styles

There are attributes and slots that cause position and padding to be redefined.
To keep track of all the permutations. All the possible outcomes are outlined here.
Use this as a checklist of to confirm all edge cases have been met.

### No Attrs
- default

### Single Attrs
- dense
- roomy
- shape-rounded

### Double Attrs
- shape-rounded + dense
- shape-rounded + roomy

## Slots that effect styles

### No Slots
- default

### Single Slot
- leading
- trailing
- add-on

### Double Slot
- leading + trailing
- leading + add-on
