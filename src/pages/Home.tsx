import { Button } from "../components/ui/button";
import TransactionForm from "../components/molecules/transactionForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import DataTableDemo, { Payment } from "./DataPage";
import backGroundImage from "../assets/background1.jpg";
import backGroundImage1 from "../assets/mainBack.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {useStore} from "../store"
import { signOut } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const [transactionList,setTransactionList] = useState([{
    amount: "",
    description: "",
    title: "",
    transactionType: "",
    uid:""            
}])

  function handleClick() {
    setMenuOpen(!menuOpen);
  }

  function logout(){
    logOut()
    signOut(auth).then(
      ()=>navigate('/login')
    )
  }

  async function getData(uid: string) {
    const querySnapshot = await getDocs(
      query(collection(db, "transactions"), where("uid", "==", uid))
    );
    let list:any = [];
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setTransactionList(list);
  }

  const {loggedIn,logOut}:any = useStore()
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if(!loggedIn){
      navigate("/login")
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const email = user.email;
        setEmail(email);
        console.log(email);
        console.log("user signed in")
        getData(user.uid);
      } else {
        console.log("user signed out")
        setTransactionList([]);
        navigate("/login")
      }
    });
    console.log(transactionList)
    return () => unsubscribe();
  }, [transactionList]);


  const paymentData: Payment[] = transactionList.map((doc) => ({
    uid: doc.uid,
    amount: doc.amount,
    title: doc.title,
    description: doc.description,
    transactionType: doc.transactionType,
  }));

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backGroundImage1})` }}
    >
      <div className="flex items-center py-4 bg-white bg-opacity-80 shadow-md"  style={{ backgroundImage: `url(${backGroundImage})` }}>
          <h1 className="text-lg sm:text-xl font-bold ml-4 flex-grow">Expense Tracker</h1>
        <div className="flex items-center">
            <h3 className="text-sm sm:text-base font-semibold">{email}</h3>
              <Avatar className="ml-2 hover:cursor-pointer" onClick={handleClick}>
                  <AvatarImage src="https://github.com/shadcn.png" loading="lazy" />
                  <AvatarFallback>LOGOUT</AvatarFallback>
              </Avatar>
        </div>
        {menuOpen && (
          <div className="ml-2">
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 font-bold text-white" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
      <Dialog>
        <DialogTrigger>
          <Button className="ml-4 mt-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 font-bold">
            New Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6 rounded-md shadow-lg bg-gray-200">
          <DialogHeader>
          </DialogHeader>
          <TransactionForm />
        </DialogContent>
      </Dialog>
      <div className="w-full py-8">
        <h1 className="flex justify-center text-2xl font-semibold mb-4 text-white">
          Data Table
        </h1>
        <div className="w-11/12 mx-auto bg-white bg-opacity-90 rounded-md shadow-md p-4">
          <DataTableDemo data={paymentData} />
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-2xl text-yellow-400 font-bold">Made By Prit Senjaliya</p>
      </div>
    </main>
  );
};

export default Home;