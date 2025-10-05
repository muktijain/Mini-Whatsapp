const mongoose = require ("mongoose");
const Chat = require("./models/chat.js");


main()
.then( () => {
    console.log("connection sucessful");
})
.catch(err => { console.log(err) });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/miniWhatsapp");
};


let allChats = [
    {
        from: "Adarana",
        to: "Voilet",
        msg: "I woke up from my dreamless sleep",
        created_at: new Date() //UTC
    },
    {
        from: "Train",
        to: "Seagyl",
        msg: "Are you alright? I got worried after listening the news of attack.",
        created_at: new Date() 
    },
    {
        from: "Rhi",
        to: "Voilet",
        msg: "I am sure, its been very hard for you. But you are not alone in this!",
        created_at: new Date() 
    },
    {
        from: "Xyden",
        to: "Garrick",
        msg: "We should hold shippments, if these people would show up again on outposts.",
        created_at: new Date() 
    },
    {
        from: "Voilet",
        to: "Bodhi",
        msg: "Thankyou for your help!",
        created_at: new Date() 
    },
    {
        from: "Aric",
        to: "Voilet",
        msg: "I know already everything which going on borders.",
        created_at: new Date() 
    }
];

Chat.insertMany(allChats);
