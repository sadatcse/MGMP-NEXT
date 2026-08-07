import PageComponent from '../../src/components/Authentication/Signup';

export const metadata = {
  title: "Sign Up",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <PageComponent />;
}
