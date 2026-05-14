type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

export async function sendTransactionalEmail(payload: EmailPayload) {
  return {
    provider: "placeholder",
    accepted: payload.to,
    subject: payload.subject,
  };
}
