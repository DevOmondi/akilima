import React, { useState } from "react";
import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConversationRole,
} from "@aws-sdk/client-bedrock-runtime";
import "./prompt.scss";

const bedrockClient = new BedrockRuntimeClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken:
      "",
  },
});

const ClaudePrompt: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const invokeClaude = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse("");
    setError("");

    try {
      const requestParams = {
        modelId: "anthropic.claude-v2",
        messages: [
          { role: ConversationRole.USER, content: [{ text: prompt }] },
        ],
        inferenceConfig: { temperature: 0.7, maxTokens: 1000 },
      };

      const command = new ConverseCommand(requestParams);
      const res = await bedrockClient.send(command);

      const content = res?.output?.message?.content;
      const responseText = Array.isArray(content)
        ? content.map((block) => block.text).join(" ")
        : "No response received.";
      setResponse(responseText);
    } catch (err) {
      console.error("Error invoking Claude:", err);
      setError("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-container">
      <h2>Ask AKILIMA</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          invokeClaude();
        }}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question here..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Send"}
        </button>
      </form>
      {response && <div className="response">{response}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ClaudePrompt;
