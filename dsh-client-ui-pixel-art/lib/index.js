// Host loader entry for the browser-only Pixel Art conversation card.
// Nothing runs on the host side: the card lives entirely in the client
// bundle (`lib/client.js`), renders `pixel-art-preview` blocks from past
// pixel_art tool results inline in the conversation, and loads the images
// over the `/dsh-pixel-art` route served by the host plugin. The drawing
// tool and its configuration card were removed.
export function apply() {}
