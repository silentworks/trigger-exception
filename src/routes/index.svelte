<script context="module">
	import { checkIfLoggedIn } from '$lib/session'
	export const load = async ({ session }) => checkIfLoggedIn({ session })
</script>

<div class="container is-max-desktop p-6">
	<section class="columns">
		<div class="column is-full">
			<div class="box">
				<p class="has-text-centered">
					You are currently signed in <a href="/account">Take me to my account</a>
				</p>
			</div>
		</div>
	</section>
</div>
