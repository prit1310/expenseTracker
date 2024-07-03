import RegisterForm from "../components/molecules/RegisterForm";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Register = () => {
  return (
    <main className="flex flex-col h-screen justify-center items-center bg-gradient-to-br from-purple-400 to-blue-500">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardTitle className="text-center text-xl font-semibold py-4">
            REGISTER PAGE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;
