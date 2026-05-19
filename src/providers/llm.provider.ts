/**
 * LLM Provider
 *
 * 智普 GLM
 */
export class LLMProvider {
  /**
   * chat
   */
  async chat(prompt: string) {
    const response = await fetch(
      "https://open.bigmodel.cn/api/paas/v4/chat/completions",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${process.env.ZHIPU_API_KEY}`,
        },

        body: JSON.stringify({
          model: "glm-5.1",

          messages: [
            {
              role: "user",

              content: prompt,
            },
          ],

          temperature: 0.1,
        }),
      }
    );

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    return data.choices[0].message.content;
  }
}
