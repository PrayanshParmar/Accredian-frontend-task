import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ReferForm from "@/components/forms/refer/refer-form";
import NavBar from "@/components/nav-bar";
import Dashboard from "@/components/dashboard";

const DashboardPage = () => {
  const [isReferDialogOpen, setIsReferDialogOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-col ">
      <NavBar isAuth={true} setIsReferDialogOpen={setIsReferDialogOpen} />
      <main className="flex-1 px-4 py-6 sm:px-6 md:py-10">
        <Dashboard />
      </main>
      <Dialog open={isReferDialogOpen} onOpenChange={setIsReferDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle>Refer a Friend</DialogTitle>
            <DialogDescription>
              Enter your friend's name, email, and the program you'd like to
              refer them to.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <ReferForm setIsReferDialogOpen={setIsReferDialogOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
