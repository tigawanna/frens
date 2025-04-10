import { useSuspenseQuery } from "@tanstack/react-query";
import { usersQueryOptions } from "./api";
import { UserWithRole } from "better-auth/plugins/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { format } from "date-fns";
import {
  User,
  Search,
  CheckCircle,
  XCircle,
  Shield,
  Ban,
  Mail,
  MoreHorizontal,
  Loader2,
  Copy,
  Check,
  Filter,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/shadcn/ui/dropdown-menu";
import { makeHotToast } from "@/components/toasters";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { copyToClipboard, getInitials } from "@/utils/string";

interface ListAllUsersProps {}

type FilterType = "all" | "verified" | "unverified" | "banned";

export function ListAllUsers({}: ListAllUsersProps) {
  const query = useSuspenseQuery(usersQueryOptions());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Reset copied ID after 2 seconds
  useEffect(() => {
    if (copiedId) {
      const timer = setTimeout(() => {
        setCopiedId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedId]);

  const data = query.data.data;

  if (!data || data.users.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex flex-col items-center justify-center h-64">
          <User className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
          <h3 className="text-xl font-semibold">No users found</h3>
          <p className="text-muted-foreground">There are no users in the system yet.</p>
        </CardContent>
      </Card>
    );
  }

  const users = data.users;

  // Filter users based on search term and filter type
  const filteredUsers = users.filter((user) => {
    // First apply search filter
    const matchesSearch =
      !searchTerm ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Then apply type filter
    const matchesType =
      filterType === "all" ||
      (filterType === "verified" && user.emailVerified) ||
      (filterType === "unverified" && !user.emailVerified) ||
      (filterType === "banned" && user.banned);

    return matchesSearch && matchesType;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Focus search input when pressing / key
    if (e.key === "/" && document.activeElement !== searchInputRef.current) {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  };

  const handleCopied = (id: string) =>
    copyToClipboard(id, (txt) => {
      setCopiedId(id);
      makeHotToast({
        title: "ID Copied!",
        description: "User ID has been copied to clipboard",
        variant: "success",
        duration: 2000,
      });
    });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown as any);
    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">All Users</CardTitle>
            <CardDescription>
              Manage all users registered on the platform
              {filteredUsers.length !== users.length && (
                <span className="ml-2">
                  (Filtered: {filteredUsers.length} of {users.length})
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, ID... (Press '/')"
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={searchInputRef}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-6 w-6"
                  onClick={() => setSearchTerm("")}>
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={filterType}
                  onValueChange={(value) => setFilterType(value as FilterType)}>
                  <DropdownMenuRadioItem value="all">All Users</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="verified">Verified Only</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="unverified">Unverified Only</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="banned">Banned Users</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">ID</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    No users matching your search or filter criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                          <AvatarFallback className="bg-primary/10">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name || "Unnamed User"}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          {user.emailVerified ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" /> Verified
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <XCircle className="h-3 w-3 mr-1" /> Unverified
                            </Badge>
                          )}
                        </div>
                        {user.banned && (
                          <Badge variant="destructive" className="mt-1">
                            <Ban className="h-3 w-3 mr-1" /> Banned
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className="font-mono text-xs p-0 h-auto hover:bg-transparent"
                              onClick={() => handleCopied(user.id)}>
                              <span className="flex items-center gap-1">
                                {user.id.substring(0, 8)}...{user.id.substring(user.id.length - 4)}
                                {copiedId === user.id ? (
                                  <Check className="h-3 w-3 text-green-500" />
                                ) : (
                                  <Copy className="h-3 w-3 opacity-50" />
                                )}
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Click to copy ID</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.role ? (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200">
                          <Shield className="h-3 w-3 mr-1" /> {user.role}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">User</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCopied(user.id)}>
                            Copy User ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.banned ? (
                            <DropdownMenuItem className="text-green-600">
                              Unban User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">Ban User</DropdownMenuItem>
                          )}
                          {!user.emailVerified && (
                            <DropdownMenuItem>Mark as Verified</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} users
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function ListAllUsersFallback() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">All Users</CardTitle>
            <CardDescription>Manage all users registered on the platform</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
