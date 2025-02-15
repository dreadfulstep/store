// app/page.tsx
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("github_access_token")?.value;

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Please sign in to GitHub
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            You need to sign in to GitHub to view your repositories.
          </p>
        </div>
      </div>
    );
  }

  const response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Oops!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Failed to fetch repositories. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const repos = await response.json();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Your GitHub Repositories
        </h1>
        {repos.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            You have no repositories yet.
          </div>
        ) : (
          <ul className="space-y-4">
            {repos.map((repo: { id: string; name: string; html_url: string }) => (
              <li
                key={repo.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {repo.name}
                </a>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                  {repo.html_url}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
