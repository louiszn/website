<script lang="ts">
	const year = new Date().getFullYear();
	const author = "Louiszn";
	const contentLicenseUrl = "https://creativecommons.org/licenses/by/4.0/";
</script>

<footer
	id="footer"
	class="flex bg-card/80 outline-card-outline outline-1 backdrop-blur-2xl w-full py-8 px-20 justify-center items-center z-99"
	style="view-transition-name: header;"
>
	<div class="flex flex-col text-center">
		<span>
			&copy; {year}
			{author}. All rights reserved.
		</span>

		<span class="text-muted">
			Source code and content is licensed under
			<a
				href={contentLicenseUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="underline hover:text-accent"
			>
				CC BY 4.0
			</a>
		</span>
	</div>
</footer>
