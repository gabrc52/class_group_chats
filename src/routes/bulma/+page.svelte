<!-- Some Bulma examples, from the docs -->
<!-- IDK how to get autocomplete for CSS classes in VSCode -->

<section class="section is-medium">
	<h1 class="title">Section</h1>
	<h2 class="subtitle">
		A simple container to divide your page into <strong>sections</strong>, like the one you're
		currently reading.
	</h2>
</section>
<section class="hero is-primary">
	<div class="container">
		<div class="hero-body">
			<p class="title">Hero title</p>
			<p class="subtitle">Hero subtitle</p>
		</div>
	</div>
</section>

<section class="section">
	<!-- Main container -->
	<div class="level">
		<!-- Left side -->
		<div class="level-left">
			<div class="level-item">
				<p class="subtitle is-5">
					<strong>123</strong> posts
				</p>
			</div>
			<div class="level-item">
				<div class="field has-addons">
					<p class="control">
						<input class="input" type="text" placeholder="Find a post" />
					</p>
					<p class="control">
						<button class="button"> Search </button>
					</p>
				</div>
			</div>
		</div>

		<!-- Right side -->
		<div class="level-right">
			<p class="level-item"><strong>All</strong></p>
			<p class="level-item"><a>Published</a></p>
			<p class="level-item"><a>Drafts</a></p>
			<p class="level-item"><a>Deleted</a></p>
			<p class="level-item"><a class="button is-success">New</a></p>
		</div>
	</div>

	<div class="tile is-ancestor">
		<div class="tile is-4 is-vertical is-parent">
			<div class="tile is-child box">
				<p class="title">One</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu
					pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat
					facilisis.
				</p>
			</div>
			<div class="tile is-child box">
				<p class="title">Two</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu
					pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat
					facilisis.
				</p>
			</div>
		</div>
		<div class="tile is-parent">
			<div class="tile is-child box">
				<p class="title">Three</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat
					pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida
					libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci,
					quis semper odio felis ut quam.
				</p>
				<p>
					Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis.
					Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et
					sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus
					felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget
					varius ligula, at volutpat tortor.
				</p>
				<p>
					Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus erat, vitae congue
					lectus dolor consequat libero. Donec leo ligula, maximus et pellentesque sed, gravida a
					metus. Cras ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis faucibus libero.
					Quisque non semper leo.
				</p>
			</div>
		</div>
	</div>

	<nav class="panel is-info">
		<p class="panel-heading">Repositories</p>
		<div class="panel-block">
			<p class="control has-icons-left">
				<input class="input" type="text" placeholder="Search" />
				<span class="icon is-left">
					<i class="fas fa-search" aria-hidden="true" />
				</span>
			</p>
		</div>
		<a class="panel-block is-active">
			<span class="panel-icon">
				<i class="fas fa-book" aria-hidden="true" />
			</span>
			bulma
		</a>
		<a class="panel-block">
			<span class="panel-icon">
				<i class="fas fa-book" aria-hidden="true" />
			</span>
			marksheet
		</a>
		<a class="panel-block">
			<span class="panel-icon">
				<i class="fas fa-book" aria-hidden="true" />
			</span>
			minireset.css
		</a>
		<a class="panel-block">
			<span class="panel-icon">
				<i class="fas fa-book" aria-hidden="true" />
			</span>
			jgthms.github.io
		</a>
		<a class="panel-block">
			<span class="panel-icon">
				<i class="fas fa-code-branch" aria-hidden="true" />
			</span>
			daniellowtw/infboard
		</a>
		<a class="panel-block">
			<span class="panel-icon">
				<i class="fas fa-code-branch" aria-hidden="true" />
			</span>
			mojs
		</a>
		<label class="panel-block">
			<input type="checkbox" />
			remember me
		</label>
		<div class="panel-block">
			<button class="button is-link is-outlined is-fullwidth"> Reset all filters </button>
		</div>
	</nav>
</section>

<footer class="footer">
	<div class="content has-text-centered">
		<p>
			<strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
			licensed
			<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is
			licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
		</p>
	</div>
</footer>
