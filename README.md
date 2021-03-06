# solid-base-components

This is a collection of barely styled components on which you can build your own
design system. It tries to use more consistent patterns for all input elements
to make development easier.

Commonly used non-native elements are also implemented, such as popovers with arrow,
and more to come.

![Demo](./static/demo.png)


## Installation

```bash
npm install solid-base-components
```

## Usage

[See live demo here](https://codesandbox.io/s/solid-base-components-demo-1uk53?file=/index.tsx)

```javascript
import { render } from 'solid-js/dom'
import { Box, Input, InputFile, Select, Popover, Checkbox, Radio } from 'solid-base-components';
// Minimally required layout styles
import 'solid-base-components/dist/build.css'

const App = () =>
  <Box vertical>
    <Input onChange={text => console.log(text)} />
    <InputFile onChange={files => console.log(files)}>Add File</InputFile>
    <Box horizontal>
      <Select
        options={options}
        value={1}
        onChange={console.log}
      />
      <Popover
        arrow
        closeOnClick
        trigger={({ ref, open }) =>
          <Button ref={ref} onClick={toggle}}>
            Click Me
          </Button>
        }
      >
        <div>Content</div>
      </Popover>
    </Box>
    <Box horizontal>
      <Checkbox onChange={isChecked => console.log(isChecked)}>
        Check Me
      </Checkbox>
      <Radio.Group
        name='number'
        options={options}
        value={1}
        onChange={console.log}
      />
    </Box>
  </Box>

render(() => App, document.getElementById('app'))
```

## Styling

You are expected to provide your own styles for components. They follow
a strict [BEM](http://getbem.com/) convention.

For example, to add button styles:

```javascript
<Button size='small' variant='primary'>
  Click Me
</Button>
```

```css
/* This would be your own CSS */
.Button {
  border: 2px solid black;
}
.Button--small {
  height: 20px;
}
.Button--primary {
  color: white;
  background-color: blue;
}
```

See [the styling documentation](./doc/styling.md) for more details.

## Icons

Icons use octicons for now. You can use them directly or on input/buttons:

```javascript
<Icon name='gear' />
<Input icon='search' iconAfter='sync' />
<Button icon='search' iconAfter='sync'>Click Me</Button>
```

![Icons](./static/icons.png)

`<Icon />` also takes props `info`, `success`, `warning` or `danger` for colors.

## Conventions

User-input elements try to follow these conventions:
 - If `props.value` didn't change, keep the value in sync with the DOM, to bring
     the behavior closer to React.
 - Have a `loading: boolean` property that sets the element to `disabled` and
     displays a spinning loading icon.
 - Choice picking components (`Select`, `Radio.Group`, `Dropdown`) take an
     `options: Option[]` property, where `Option` is `{ value: string|number|null, label: JSX.Element }`.
 - Have an `onChange(value: any, ev: Event)` handler, where the first argument
    is the new value. If it's a choice-picking component, the `Option` is passed as
    a third argument.
