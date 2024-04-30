// 'use client';


// //NOTE THIS PAGE IS NOT ACTUALLY INTENDED FOR USER USE SO has been commented after using it 

// export default function FillFactsService(){

//     let thisFact = "";
//     const factStrings = [];

//     function nonsense(){
//         factStrings.push("1")
//         factStrings.push("2")
//         factStrings.push("3")
//     }
    

//     function fillFacts(){
//         //history facts
//         factStrings.push(
//             "Coffee is believed to have been discovered by a goat herder named Kaldi in Ethiopia around the 9th century.",
//             "The first recorded use of coffee as a beverage was in the Sufi monasteries of Yemen in the 15th century.",
//             "Coffee was initially consumed as a food and not as a beverage. It was mixed with fat and formed into energy balls.",
//             "The first coffeehouse in the world opened in Constantinople (modern-day Istanbul) in 1475.",
//             "Coffeehouses became known as 'Schools of the Wise' due to the intellectual discussions that took place within them.",
//             "Coffee was banned in Mecca in the 16th century because leaders feared it might stimulate radical thinking.",
//             "Pope Clement VIII was asked to intervene in the controversy over whether Catholics could drink coffee. After tasting it, he declared it should be baptized, making it an acceptable Christian beverage.",
//             "The first coffeehouse in England opened in Oxford in 1650.",
//             "Coffee arrived in North America in the mid-1600s, brought by the British colonists.",
//             "The Boston Tea Party of 1773 played a role in popularizing coffee in America, as tea became associated with British oppression.",
//             "Brazil has been the world's largest coffee producer for over 150 years, since the early 19th century.",
//             "The term 'cappuccino' originated from the Capuchin friars, referring to the color of their robes.",
//             "The invention of the espresso machine in 1884 revolutionized the way coffee was brewed, leading to the creation of various espresso-based drinks.",
//             "Instant coffee was invented by George Washington in 1906.",
//             "The term 'Americano' originated during World War II when American soldiers stationed in Italy would dilute espresso with water to replicate the milder coffee they were accustomed to.",
//             "Coffee consumption surged in the United States during World War II when soldiers were issued instant coffee as part of their rations.",
//             "The first Starbucks store opened in Seattle in 1971.",
//             "Fair Trade coffee certification, aimed at ensuring fair prices and treatment for coffee farmers, was established in the late 20th century.",
//             "The specialty coffee movement, emphasizing high-quality beans and artisanal roasting, gained popularity in the 21st century.",
//             "Today, coffee is one of the most widely consumed beverages in the world, with over 2.25 billion cups consumed every day."
//             ,            "The Ethiopian town of Yirgacheffe is famous for its high-quality coffee beans, known for their floral and fruity flavors.",

//         );
       
//     }




//     const handleSubmit = async (event) => { 
        
//         event.preventDefault();


//         for(let i = 0; i < 21 ;i++){

//             thisFact = factStrings.pop();
        
            
//             try {
//                 const postTextResponse = await fetch('http://localhost:1337/api/facts', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         data: {
//                             FactItself:thisFact
//                         }
//                     })
//                 });

//                 if (!postTextResponse.ok) {
//                     throw new Error('Failed to create post');
//                 }

//                 console.log(postTextResponse.status);
//                 const postData = await postTextResponse.json();
//                 const id = postData.data.id;

            



//             } 
//             catch (error) {
//                 console.error('There was a problem:', error);
//                 // Handle errors accordingly
//             }
//         }


        
//     };

//     function clear(){
//         factStrings.length=0
//     }

//     function print(){
//         console.log(factStrings.length)
//         console.log(factStrings.toString())
//     }


//     return(
//         <div>
//             <button onClick={handleSubmit}>Push to backend</button>
//             <button onClick={fillFacts}>FILL FACTS</button>
//             <button onClick={nonsense}>nonsense</button>
//             <button onClick={clear}>clear</button>
//             <button onClick={print}>print</button>

                
//         </div>
//     )
// }
