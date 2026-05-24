import api from "../lib/axios";

export async function runCode({
  code,
  language,
}: {
  code: string;

  language: string;
}) {
  const response = await api.post('/run', {
    code,
    language
  })

  return response.data;
}
