import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import { ReferFriendHandler } from "@/api/referal/referal";
import { ReferSuccess } from "@/lib/res_types";

const referSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email("Email is required"),
  programs: z.string(),
});

type ReferFormProps = {
  setIsReferDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const programOptions = [
  {
    value: "program_in_product_managment",
    label: "Program in Product Managment",
  },
  {
    value: "program_in_computer_science",
    label: "Program in Computer Science",
  },
  {
    value: "program_in_data_science",
    label: "Program in Data Science",
  },
];
const ReferForm: React.FC<ReferFormProps> = ({ setIsReferDialogOpen }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof referSchema>>({
    resolver: zodResolver(referSchema),
    defaultValues: {
      name: "",
      email: "",
      programs: "program_in_product_managment",
    },
  });

  const { mutate: ReferFriendMutate, isPending: ReferFriendIsPending } =
    useMutation({
      mutationKey: ["refer-friend"],
      mutationFn: ReferFriendHandler,
      onError: (error: Error) => {
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
      onSuccess: (data: ReferSuccess) => {
        toast({
          title: data.message,
          variant: "success",
        });
      },
    });

  function onSubmit(data: z.infer<typeof referSchema>) {
    console.log(data);
    setIsReferDialogOpen(false);
    ReferFriendMutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={ReferFriendIsPending}
                  placeholder="Enter name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={ReferFriendIsPending}
                  placeholder="Enter email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="programs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programs</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program to refer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programOptions.map((items, index) => {
                    return (
                      <SelectItem
                        disabled={ReferFriendIsPending}
                        key={index}
                        value={items.value}
                      >
                        {items.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className=" max-sm:space-y-2">
          <Button disabled={ReferFriendIsPending} type="submit">
            Refer
          </Button>
          <Button variant="outline" onClick={() => setIsReferDialogOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ReferForm;
