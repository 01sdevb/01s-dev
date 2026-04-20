import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCreateScript,
  getListScriptsQueryKey,
  getGetScriptStatsQueryKey,
  getGetTrendingScriptsQueryKey,
  getGetUserProfileQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/auth-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, ArrowLeft } from "lucide-react";

const CATEGORIES = ["GUI", "Admin", "Hub", "FPS", "Tycoon", "Simulator", "RPG", "Other"];

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title too long"),
  game: z.string().min(1, "Game name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().max(500, "Description too long"),
  code: z.string().min(1, "Script code is required"),
});

type FormValues = z.infer<typeof schema>;

export default function UploadScript() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      game: "",
      category: "",
      description: "",
      code: "",
    },
  });

  const createMutation = useCreateScript({
    mutation: {
      onSuccess: (script) => {
        queryClient.invalidateQueries({ queryKey: getListScriptsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetScriptStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTrendingScriptsQueryKey() });
        if (user) {
          queryClient.invalidateQueries({ queryKey: getGetUserProfileQueryKey(user.username) });
        }
        toast({ title: "Script published!", description: `"${script.title}" is now live` });
        setLocation(`/script/${script.id}`);
      },
      onError: (error: unknown) => {
        const msg =
          (error as { response?: { data?: { error?: string } } })?.response?.data?.error ||
          "Failed to publish script";
        toast({ title: "Error", description: msg, variant: "destructive" });
      },
    },
  });

  if (!user && !isLoading) return null;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate({ data: values });
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Upload a Script</CardTitle>
          <CardDescription>Share your script with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My Amazing Script" data-testid="input-title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game</FormLabel>
                      <FormControl>
                        <Input placeholder="Game name" data-testid="input-game" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what your script does..."
                        className="resize-none"
                        rows={3}
                        data-testid="textarea-description"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {field.value.length}/500 characters
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Script Code</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="-- Paste your script code here..."
                        className="resize-y font-mono text-sm min-h-[200px]"
                        rows={12}
                        data-testid="textarea-code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={createMutation.isPending}
                data-testid="button-upload"
              >
                {createMutation.isPending ? (
                  "Publishing..."
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Script
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
