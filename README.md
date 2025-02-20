
# Floating Chat Component

A beautiful, customizable floating chat component for React applications.

## Usage

```jsx
import { FloatingChat } from 'floating-chat';
import 'floating-chat/styles.css';

function App() {
  return (
    <FloatingChat
      apiKey="your-api-key"
      theme={{
        primaryColor: 'bg-zinc-900',
        glassMorphism: true,
        bubbleSize: 'medium',
      }}
      initialMessage="Hello! How can I help you today?"
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| apiKey | string | Your API key for the chat service |
| theme | ChatTheme | Customize the appearance of the chat component |
| initialMessage | string | First message shown in the chat |
| placeholder | string | Placeholder text for the input field |
| className | string | Additional CSS classes |

### Theme Options

The `theme` prop accepts an object with the following properties:

```typescript
interface ChatTheme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  bubbleSize?: 'small' | 'medium' | 'large';
  glassMorphism?: boolean;
}
```

## License

MIT
