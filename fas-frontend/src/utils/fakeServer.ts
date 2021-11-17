import { iMessage } from "./interfaces"
const msgs = ["how you doing bae!", "i have you!!", "for now yes", "what do you mean?", "i'm leaving for the moon", "that doesn't make a difference, i'll be with you no matter what", "yeah me too", "he this is vikas reporting from moon over an out", "hi how is the climate there? ha ha", "one more line just to fill the box", "list line promise"]
export const messages = () => {

    const tmp = msgs.map((content, i) => {
        const msg = new message(content);
        if (i % 2) msg.user = "hksvwy";
        return msg;
    })
    return tmp;
}


class message implements iMessage {
    id: number = 0;
    content: string = "";
    user: string = ""
    constructor(content: string) {
        this.id = new Date().getTime();
        this.user = "aeiijnstw";
        this.content = content;
    }
}