import axios from 'axios';

const api_url = 'https://v2.jokeapi.dev/joke/Any';

async function Quote() {
  try {
    const response = await axios.get(api_url);
    // Check if the joke is single-part or two-part
    if (response.data.type === 'single') {
      console.log(response.data.joke);  // Single-part joke
    } else if (response.data.type === 'twopart') {
      console.log(response.data.setup);  // Setup of the two-part joke
      console.log(response.data.delivery);  // Delivery of the two-part joke
    }
  } catch (error) {
    console.error("获取引言时出错: ", error);
  }
}

Quote();
