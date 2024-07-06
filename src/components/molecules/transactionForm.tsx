import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { auth, db } from "../../lib/firebase";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {doc,setDoc } from "firebase/firestore";
import backImgForm from "../../assets/formback.webp"
import {DialogClose} from "../ui/dialog"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Minimum 2 characters required",
  }),
  description: z.string().optional(),
  amount: z.string(),
  transactionType: z.string(),
});

const TransactionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      transactionType: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, auth.currentUser);

    try {
      const docRef = await setDoc(doc(db, "transactions",values.title), {
        uid: auth.currentUser?.uid,
        title: values.title,
        description: values.description,
        amount: values.amount,
        transactionType: values.transactionType,
      });

      console.log(docRef);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <>
      <div className="p-9 rounded-lg shadow-lg max-w-lg w-full mb-16 mt-12 bg-cover text-white" style={{backgroundImage:`URL(${backImgForm})`}}>
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Transaction</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter title"
                      {...field}
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter description"
                      {...field}
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      {...field}
                      type="number"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="Income" />
                        </FormControl>
                        <FormLabel className="font-normal">Income</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="Expense" />
                        </FormControl>
                        <FormLabel className="font-normal">Expense</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
              Submit
            </Button>
            </DialogClose>
          </form>
        </Form>
      </div>
    </>
  );
};

export default TransactionForm;