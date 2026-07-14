
const axios = require("axios");

exports.generateAIReply = async (setting,studentMessage)=>{
    try{
        const finalPrompt = `You are an Admission Counsellor for a college.
         College Name : ${setting.collegeName || ""}
         Courses: ${setting.courses || ""}
         Fees : ${setting.fees || ""}
         Admission Process :${setting.admissionProcess || ""}
         Contact Info: ${setting.contactInfo || ""}
         Extra Instructions : ${setting.systemPrompt || ""}
         Student Message : ${studentMessage}
         reply in simple helpful Hinglish or English or Hindi, keep the reply short and admission-focused`;

         if(process.env.AI_PROVIDER === "openrouter"){
            const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
                {
                    model:process.env.AI_MODEL,
                    messages:[
                        {
                        role:"user",
                        content:finalPrompt
                        }
                    ]
                },
                {
                    headers:{
                        Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type" : "application/json"
                }
                    }
            );
            return response.data.choices[0].message.content;
         };
         return "Thankyou for contacting us. Please share which course you are interested in."
    }
    catch(err){
        console.log("AI ERROR ",err.message);
        return "Sorry, we are currently unavailable, will contact you soon"
    }
}