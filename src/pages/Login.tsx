import { Link} from "react-router-dom";
import LoginForm from "../components/molecules/LoginForm";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";

const Login = () => {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-purple-400 to-blue-500">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardTitle className="text-center text-xl font-semibold py-4">
              LOGIN PAGE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
          <CardFooter className="flex justify-center items-center p-4 border-t border-gray-300">
            <p className="text-gray-600">New here? <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link></p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Login;
