import { Html, Body, Container, Button, Text } from '@react-email/components';

interface ForgotPasswordEmailProps {
  resetLink: string;
  ip: string;
}

const ForgotPasswordEmail = ({ resetLink, ip }: ForgotPasswordEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: 'rgba(18, 18, 18, 1)', color: "#ffffff", padding: '20px' }}>
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: 'rgba(18, 18, 18, 1)',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <h1
            style={{
              color: 'rgb(46, 167, 138)',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Forgot Your Password?
          </h1>
          <Text style={{ fontSize: '16px', color: '#FFF', textAlign: 'center' }}>
            We received a request to reset your password. If you didn’t make this request, you can safely ignore this email.
          </Text>
          <Text style={{ fontSize: '16px', color: '#FFF', textAlign: 'center', marginTop: '20px' }}>
            To reset your password, click the button below:
          </Text>
            <Button
                href={resetLink}
                style={{
                    display: 'block',
                    backgroundColor: 'rgb(46, 167, 138)',
                    color: '#ffffff',
                    fontSize: '16px',
                    textAlign: 'center',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    marginTop: '20px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '200px',
                }}
            >
                Reset Your Password
            </Button>
          <Text style={{ fontSize: '14px', color: '#FFF', textAlign: 'center', marginTop: '30px' }}>
            Request made from IP: {ip}
          </Text>

          <Text style={{ fontSize: '14px', color: '#FFF', textAlign: 'center', marginTop: '10px' }}>
            This link will expire in one hour.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ForgotPasswordEmail;
