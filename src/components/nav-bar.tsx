import { MountainIcon, ReplyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { LogoutHandler } from "@/api/user/user";
import { useToast } from "./ui/use-toast";

interface NavBarProps {
  isAuth: boolean;
  setIsReferDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ isAuth, setIsReferDialogOpen }: NavBarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onClick = async () => {
    const data = await LogoutHandler();
    if (data) {
      toast({
        title: data.message,
        variant: "success",
      });
      navigate("/login");
    } else {
      toast({
        title: "Internal server error",
        variant: "destructive",
      });
    }
  };
  if (isAuth && setIsReferDialogOpen) {
    return (
      <>
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b  px-4 backdrop-blur-md sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Refer &amp; Earn</span>
          </a>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ReplyIcon className="h-5 w-5" />
              <span className="sr-only">Feedback</span>
            </Button>
            <Button
              className="rounded-md px-4 py-2"
              onClick={() => setIsReferDialogOpen(true)}
            >
              Refer
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onClick()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </>
    );
  }
  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Refer &amp; Earn</span>
        </a>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ReplyIcon className="h-5 w-5" />
            <span className="sr-only">Feedback</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="rounded-md px-4 py-2"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="rounded-md px-4 py-2"
            >
              Register
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
