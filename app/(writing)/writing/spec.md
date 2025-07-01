ok let's make a writing page

it's going to be really minimal

so first, let's have it display the "onboarding" (a full screen pretty simple onboarding)
- hi! what's your name? <whatever your name is>
--fadeout/fadein transition--
- here's a writing surface for you! <press ok>
--fadeout/fadein transition--
- how this works: you can just write here, and i'll just ask you questions along the way! in small text we have: your files are stored in localstorage

and then it displays the Editor
The Editor is a textbox with no borders, so it looks like you're just writing directly on the page.
we use tiptap to do the actual writing

we listen for AI-activation events
- randomly, every 15-30s, the AI wil read your current typing rate: if you are typing a lot, like continuously, then we will show_congratulatory_message
- if you stopped for a while, then the AI will say_something (maybe a question)
- if you highlight something, the AI will explore()

## Implementation Status: ✅ COMPLETE

### Features Implemented:

1. **Onboarding Flow** ✅
   - 3-step onboarding with fade transitions
   - Name collection
   - Introduction to writing surface
   - Explanation of AI features
   - localStorage persistence

2. **Minimal Editor** ✅
   - Borderless Tiptap editor
   - Clean, distraction-free interface
   - Automatic content saving to localStorage
   - Beautiful typography with Inter font

3. **AI Interaction System** ✅
   - Typing rate monitoring
   - Congratulatory messages for active typing
   - Questions when user pauses
   - Text selection exploration
   - Random 15-30s intervals
   - Smooth popup notifications

4. **Data Persistence** ✅
   - All content saved to localStorage
   - User preferences remembered
   - Onboarding state tracked

### File Structure:
```
app/(writing)/
├── layout.tsx
└── writing/
    ├── page.tsx              # Main page component
    ├── WritingOnboarding.tsx # 3-step onboarding
    ├── WritingEditor.tsx     # Tiptap editor with AI
    ├── AIInteraction.tsx     # AI popup component
    └── spec.md              # This specification
```

### Usage:
Visit `/writing` to start the writing experience!