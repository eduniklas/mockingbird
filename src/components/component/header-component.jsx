import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function HeaderComponent() {
  return (
    <header>
      <div className="flex min-w-screen items-center justify-between h-14 px-4 sm:px-6 border-b">
        <nav className="flex items-center space-x-4">
          <Link className="flex items-center space-x-2" href="/">
            <FlagIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <Link className="font-medium hover:underline underline-offset-4" href="/feed">
            Feed
          </Link>
          <Link className="font-medium hover:underline underline-offset-4" href="/#">
            Explore
          </Link>
          <Link className="font-medium hover:underline underline-offset-4" href="/#">
            Notifications
          </Link>
          <Link className="font-medium hover:underline underline-offset-4" href="/register">
            Register
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Input
            className="w-[300px] max-w-[50vw] rounded-full border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-300 dark:focus:ring-gray-300"
            placeholder="Search Twitter"
            type="search"
          />
          <div className="flex items-center space-x-2">
            <img
              alt="Avatar"
              className="rounded-full"
              height="40"
              src="/placeholder-user.jpg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <Button variant="ghost">
              <ChevronDownIcon className="w-5 h-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}


function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
