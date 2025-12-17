declare module "next/server" {
	interface RouteParams<T = Record<string, string>> {
		params: T;
	}
}