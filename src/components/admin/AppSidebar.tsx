"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Music,
  ListMusic,
  Users,
  Settings,
  LogOut,
  Layers,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
  SidebarMenuAction,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { title: "Обзор", url: "/admin", icon: LayoutDashboard },
  { title: "Треки", url: "/admin/tracks", icon: Music },
  { title: "Плейлисты", url: "/admin/playlists", icon: ListMusic },
  { title: "Пользователи", url: "/admin/users", icon: Users },
];

export function AppSidebar({ user, ...props }: { user: any } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const initials = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase();

  const handleSignOut = () =>
    signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/50 backdrop-blur-xl" {...props}>
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-accent/50 group-data-[collapsible=icon]:p-0!">
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">

                  <svg className="size-18" xmlns="http://www.w3.org/2000/svg" width="228" height="228" viewBox="0 0 228 228" fill="none">
                    <g clipPath="url(#clip0_113_1146)">
                      <circle cx="114" cy="114" r="113.548" transform="rotate(137.38 114 114)" fill="url(#paint0_radial_113_1146)" />
                      <circle cx="114" cy="114" r="112.82" transform="rotate(137.38 114 114)" stroke="black" strokeOpacity="0.11" strokeWidth="1.45574" />
                      <g clipPath="url(#clip1_113_1146)">
                        <g filter="url(#filter1_i_113_1146)">
                          <path d="M177.129 177.203L177.204 177.134C183.217 171.522 182.883 165.697 180.445 158.92C179.439 156.107 178.245 153.842 177.1 151.651C175.459 148.513 173.885 145.49 172.952 141.166C171.954 136.447 173.419 132.191 174.823 128.149C176.579 123.091 178.219 118.359 174.778 113.394C170.599 107.368 164.017 109.803 157.091 112.359C150.604 114.747 143.813 117.256 138.384 113.032C138.304 112.967 138.225 112.902 138.145 112.837C134.957 110.232 133.923 105.604 135.766 101.93C138.855 95.7848 146.063 95.1268 152.951 94.507C160.293 93.8442 167.284 93.2081 168.482 85.974C169.471 80.0191 165.942 76.4414 162.196 72.6281C159.191 69.577 156.048 66.376 154.915 61.6823C153.879 57.3739 154.02 53.9799 154.157 50.4313C154.25 47.9522 154.356 45.4016 154.048 42.4216C153.336 35.2626 151.151 29.8554 143.301 27.365L143.189 27.3295L143.087 27.3046C135.2 24.9672 130.357 28.1964 125.738 33.7322C123.818 36.0322 122.471 38.2015 121.158 40.3C119.281 43.3127 117.481 46.1946 114.215 49.1803C110.648 52.4419 106.254 53.3201 102.057 54.155C96.8102 55.2038 91.8963 56.184 89.3604 61.6624C86.291 68.324 91.7005 72.763 97.4198 77.4312C102.77 81.8059 108.379 86.3975 107.477 93.2214C106.907 97.5042 103.2 100.915 98.8762 101.095C92.0124 101.397 87.9245 95.4054 84.0204 89.7C79.8545 83.6026 75.9127 77.8132 68.9993 80.2968C63.32 82.3372 61.9142 87.1518 60.4123 92.292C59.2108 96.4043 57.9498 100.71 54.3931 103.982C51.1363 106.978 48.105 108.521 44.9369 110.131C42.7265 111.254 40.4528 112.416 37.9914 114.127C32.0816 118.239 28.4307 122.785 30.073 130.848C30.082 130.88 30.0902 130.931 30.0992 130.963L30.1262 131.057C31.9241 139.095 37.1094 141.743 44.1935 143.078C47.1375 143.633 49.6873 143.76 52.1655 143.874C55.7026 144.042 59.1055 144.214 63.3022 145.615C67.8853 147.135 70.8025 150.563 73.5726 153.811C77.0399 157.88 80.3012 161.704 86.3169 161.234C93.6344 160.673 94.8693 153.78 96.1714 146.51C97.392 139.709 98.6676 132.581 105.058 130.045C105.603 129.821 106.177 129.649 106.771 129.478C110.428 128.486 114.494 129.83 116.555 133.017C120.282 138.787 117.207 145.335 114.257 151.59C111.105 158.268 108.111 164.603 113.757 169.3C118.397 173.161 123.26 171.931 128.455 170.633C132.598 169.59 136.961 168.483 141.569 169.901C145.802 171.19 148.661 173.03 151.662 174.937C153.749 176.281 155.897 177.648 158.616 178.905C165.177 181.929 170.932 182.766 177.054 177.272L177.129 177.203Z" fill="black" />
                        </g>
                      </g>
                    </g>
                    <defs>
                      <filter id="filter1_i_113_1146" x="29.6787" y="26.5352" width="152.411" height="157.754" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="3" />
                        <feGaussianBlur stdDeviation="21.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.568627 0 0 0 0 0 0 0 0 0 0.988235 0 0 0 0.4 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_113_1146" />
                      </filter>
                      <radialGradient id="paint0_radial_113_1146" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(159.355 52.0766) rotate(133.196) scale(211.261 349.24)">
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </radialGradient>
                      <clipPath id="clip0_113_1146">
                        <rect width="228" height="228" fill="white" />
                      </clipPath>
                      <clipPath id="clip1_113_1146">
                        <rect width="157.934" height="145.414" fill="white" transform="translate(235.096 123.869) rotate(137.384)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                  <span className="truncate font-black uppercase tracking-tighter italic">

                    <svg className="w-24 h-auto" xmlns="http://www.w3.org/2000/svg" width="624" height="200" viewBox="0 0 624 200" fill="none">
                      <g filter="url(#filter0_i_76_15)">
                        <path d="M309.121 44.3249C309.76 44.2572 310.403 44.2197 311.046 44.2133C331.896 44.0786 342.676 58.5341 344.394 78.0971C345.388 89.4028 344.906 100.489 344.891 111.801L344.921 165.81C330.229 166.11 314.245 165.837 299.463 165.843C298.901 139.958 300.702 113.048 298.492 87.2499C297.963 81.0704 290.842 81.0994 289.092 83.9443C284.866 90.8153 286.046 106.18 286.103 114.408C286.37 131.286 286.125 148.902 286.124 165.836C271.264 165.993 256.025 165.842 241.141 165.843C241.45 154.322 241.078 140.696 241.077 128.961L241.052 46.3098C254.203 46.0851 267.357 46.0848 280.507 46.3092C280.213 49.1346 278.839 67.0107 280.502 68.4802C284.708 66.5088 284.522 46.908 309.121 44.3249Z" fill="url(#paint0_linear_76_15)" />
                        <path d="M464.447 12.2592L491.491 12.1774C497.262 12.164 503.99 12.0376 509.69 12.4196L509.76 116.399L509.779 147.565C509.788 152.821 510.016 160.71 509.547 165.791L464.7 165.812C464.371 151.719 464.612 137.468 464.618 123.348L464.594 56.3918C464.615 42.2967 465.066 26.2051 464.447 12.2592Z" fill="url(#paint1_linear_76_15)" />
                        <path d="M187.669 53.7247C192.61 53.4789 198.847 53.6027 203.876 53.6088L232.224 53.7463C233.05 75.693 232.345 99.6117 232.326 121.716L232.34 149.221C232.347 154.127 232.561 160.687 232.126 165.417C229.718 166.342 193.253 165.847 187.721 165.842L187.634 101.367C187.573 85.3339 187.283 69.7686 187.669 53.7247Z" fill="url(#paint2_linear_76_15)" />
                        <path d="M46.0154 69.3865C47.9161 66.7931 49.0775 63.428 50.6561 60.5947C60.5582 42.822 84.3832 39.2877 100.242 51.0315C106.252 55.4829 108.364 60.813 110.914 67.4864C116.095 57.3741 121.136 49.6491 132.557 45.9465C140.948 43.2266 152.749 44.0357 160.579 48.0508C181.108 58.5781 179.31 85.4421 179.132 105.138C179.07 112.172 179.049 119.205 179.069 126.239C179.072 138.819 179.441 153.478 179.009 165.801L130.532 165.876C130.691 149.703 130.74 133.528 130.68 117.354C130.676 107.948 131.084 98.396 130.059 89.0593C129.863 87.2757 129.083 84.5048 127.741 83.3902C122.45 78.993 117.988 85.1037 117.385 89.9914C116.884 94.0507 116.866 97.3441 116.788 101.128C116.665 108.384 116.653 115.641 116.754 122.896C116.844 137.209 116.617 151.511 116.808 165.83C100.441 165.694 84.0724 165.704 67.7055 165.861L67.6488 117.781C67.6488 108.746 67.8033 100.009 67.2384 90.9661C66.4054 77.6326 54.9263 79.8507 54.1646 91.0176C53.6542 98.5055 53.9586 106.17 53.8639 113.704C53.4763 131.08 53.4014 148.461 53.6393 165.839L17.8274 165.735C12.9179 165.736 4.56998 166.123 0 165.822V49.829C0.16193 48.9616 0.344836 47.3331 0.86389 46.7206C4.27982 45.8014 10.4005 46.0959 14.1305 45.991C24.8064 45.6916 35.2301 46.3175 45.9161 46.3215C45.4112 52.8239 44.5989 63.3427 46.0154 69.3865Z" fill="url(#paint3_linear_76_15)" />
                        <path d="M414.661 132.314C413.251 134.383 412.428 136.738 411.112 138.698C407.02 144.773 400.237 149.607 392.855 150.714C371.058 153.982 356.122 139.885 352.024 118.846C346.951 92.8039 350.281 51.579 382.343 44.9001C396.411 41.9701 412.97 49.0024 416.919 63.6521C417.099 64.2707 417.477 65.1808 418.156 65.1579C419.762 62.6664 418.744 50.3808 419.003 46.5827C422.662 46.1864 427.187 46.2611 430.923 46.2059C439.905 46.1285 448.887 46.1763 457.869 46.3501L457.808 116.801C457.695 140.587 461.55 167.781 442.83 185.818C433.927 194.396 423.869 196.876 411.922 198.472C411.084 198.588 409.899 198.818 409.089 199.094H394.406C391.015 198.226 386.094 197.829 382.425 197.185C372.95 195.521 362.746 190.29 357.706 181.844C353.748 175.216 353.486 167.738 353.145 160.253C359.522 159.02 367.889 158.323 374.491 157.664C379.897 157.125 387.139 156.212 392.374 156.011C392.693 163.037 393.903 166.835 401.932 166.537C410.496 166.22 413.412 158.442 414.238 151.074C414.93 144.923 415.828 138.441 414.661 132.314ZM405.234 119.886C407.172 119.905 408.004 119.785 409.494 118.332C413.382 114.545 414.171 105.606 414.168 100.368C414.168 95.0534 413.644 85.543 409.704 81.644C408.245 80.2016 407.023 79.6092 404.978 79.6195C404.464 79.622 403.949 79.6375 403.437 79.6656C400.56 80.6205 398.65 81.7614 397.376 84.6963C393.714 93.1277 393.946 103.876 396.386 112.605C397.605 116.963 400.71 119.746 405.234 119.886Z" fill="url(#paint4_linear_76_15)" />
                        <path d="M624 126.455C623.33 128.851 623.116 131.719 622.458 134.186C618.644 148.424 608.976 160.096 594.783 164.81C593.086 165.375 591.365 166.22 589.613 166.697C572.261 170.849 552.057 169.374 537.115 158.9C522.359 148.435 515.888 130.739 515.047 113.415C514.245 96.8964 516.765 79.4734 526.506 65.7847C534.589 54.4869 546.372 47.3933 560.049 45.3551C574.96 42.9895 590.71 45.4332 603.187 54.3067C613.912 61.9308 619.817 73.6295 622.33 86.2901C623.107 90.2141 623.354 93.8609 624 97.7299V109.416C623.762 110.661 623.549 111.911 623.36 113.165C604.756 113.509 586.213 113.39 567.602 113.169C565.265 113.141 562.554 113.195 560.238 113.4C560.762 119.335 561.484 129.23 566.362 133.347C568.187 134.868 570.549 135.588 572.91 135.343C580.777 134.592 580.134 124.505 581.575 119.138C589.893 120.083 598.443 121.4 606.806 122.375C610.426 122.797 620.776 123.915 624 124.631V126.455ZM572.889 95.017C574.57 94.9938 577.779 95.0612 579.293 94.6737C581.082 92.3617 578.041 79.549 574.933 77.8367C572.13 76.293 571.633 76.2372 568.48 76.5955C564.357 78.4904 563.047 82.3061 561.795 86.5624C561.356 88.0506 559.376 93.8023 561.825 94.7383C564.26 95.2109 570.412 95.0271 572.889 95.017Z" fill="url(#paint5_linear_76_15)" />
                        <path d="M205.408 0H213.712C218.115 1.18275 219.987 1.27462 224.389 3.61165C229.182 6.19527 232.749 10.5833 234.3 15.8051C235.948 21.2023 235.469 27.8317 232.715 32.859C226.043 44.9992 210.087 46.8584 198.092 42.6457C191.689 40.3972 187.019 34.6884 185.158 28.2843C183.518 22.7648 184.17 16.8166 186.967 11.7842C191.294 4.02737 197.554 2.1895 205.408 0Z" fill="url(#paint6_linear_76_15)" />
                      </g>
                      <defs>
                        <filter id="filter0_i_76_15" x="0" y="0" width="624" height="202.094" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dy="3" />
                          <feGaussianBlur stdDeviation="21.5" />
                          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.94902 0 0 0 0 0.898039 0 0 0 0 0.992157 0 0 0 0.25 0" />
                          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_76_15" />
                        </filter>
                        <linearGradient id="paint0_linear_76_15" x1="245.551" y1="170.174" x2="348.774" y2="162.731" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ECD9FD" />
                          <stop offset="1" stopColor="#ECD9FD" stopOpacity="0.63" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_76_15" x1="466.411" y1="171.142" x2="511.687" y2="170.013" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ECD9FD" />
                          <stop offset="1" stopColor="#ECD9FD" stopOpacity="0.63" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_76_15" x1="189.426" y1="169.878" x2="234.436" y2="168.352" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ECD9FD" />
                          <stop offset="1" stopColor="#ECD9FD" stopOpacity="0.63" />
                        </linearGradient>
                        <linearGradient id="paint3_linear_76_15" x1="7.75582" y1="170.16" x2="183.92" y2="148.261" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ECD9FD" />
                          <stop offset="1" stopColor="#ECD9FD" stopOpacity="0.63" />
                        </linearGradient>
                        <linearGradient id="paint4_linear_76_15" x1="354.775" y1="204.465" x2="462.147" y2="198.145" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ECD9FD" />
                          <stop offset="1" stopColor="#ECD9FD" stopOpacity="0.63" />
                        </linearGradient>
                        <linearGradient id="paint5_linear_76_15" x1="519.628" y1="173.162" x2="627.908" y2="165.141" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ECD9FD" />
                          <stop offset="1" stopColor="#ECD9FD" stopOpacity="0.63" />
                        </linearGradient>
                        <linearGradient id="paint6_linear_76_15" x1="186.477" y1="46.2379" x2="236.885" y2="41.3831" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#ECD9FD" />
                          <stop offset="1" stopColor="#ECD9FD" stopOpacity="0.63" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>

                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[state=collapsed]:hidden">Медиатека</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = item.url === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-200",
                      isActive ? "bg-accent text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("size-4", isActive && "text-primary")} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto group-data-[state=collapsed]:hidden">
          <SidebarGroupLabel>Инструменты</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="size-4" />
                <span>Настройки</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-0!"
                >
                  <Avatar className="h-8 w-8 rounded-lg border border-border/50">
                    {user.image && <AvatarImage src={user.image} alt={user.name || ""} />}
                    <AvatarFallback className="rounded-lg bg-zinc-900 text-zinc-100 text-xs font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                    <span className="truncate font-semibold text-xs">{user.name || "Администратор"}</span>
                    <span className="truncate text-[10px] text-muted-foreground">{user.email}</span>
                  </div>
                  <MoreHorizontal className="ml-auto size-4 group-data-[state=collapsed]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-xl bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl"
                side="right"
                align="end"
                sideOffset={12}
              >
                <DropdownMenuItem className="cursor-pointer focus:bg-zinc-900 mx-1 rounded-lg gap-3 py-2">
                  <Users className="size-4" /> Профиль
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-400 focus:bg-red-950/30 focus:text-red-400 mx-1 rounded-lg gap-3 py-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="size-4" /> Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
