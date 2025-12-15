import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/*{items.map((item) => (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton tooltip={item.name} isActive={isActive}>
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </NavLink>
          ))}*/}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
