import SideNav from "../ui/admin/sidenav";

export default function Layout ({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
        {/* <div className="flex h-screen flex-col"> */}
            {/* <div className="w-full flex-none md:w-64"> */}
            <div className="flex-none w-64 bg-red-400 m-2 p-3">
                <h1>TODO : sidenav</h1>
                {/* <SideNav /> */}
            </div>
            {/* <div className="flex-grow p-6"> */}
            <div className="flex-1 w-64 bg-blue-400">
                {children}
            </div>
        </div>
    );
}