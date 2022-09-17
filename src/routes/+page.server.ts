import { error } from '@sveltejs/kit'
import { parse } from 'node-html-parser'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const data = await fetch('https://www.imdb.com/chart/moviemeter/')
	const moviesPage = await data.text()

	const moviesPageHtml = parse(moviesPage)
	const movies = moviesPageHtml
		.querySelectorAll('.lister-list > tr')
		.slice(0, 10)

	const popularMovies = await Promise.all(
		movies.map(async (movie) => {
			const title = movie.querySelector('.titleColumn > a')
			const year = movie.querySelector('.secondaryInfo')
			const rating = movie.querySelector('.ratingColumn > strong[title]')

			if (!title || !year || !rating) {
				throw error(400, {
					message: 'Something went wrong fetching the data.'
				})
			}

			const href = title.getAttribute('href')
			const [movieId] = href?.match(/tt[0-9]*/g) ?? ''

			const data = await fetch(`https://www.imdb.com/title/${movieId}`)
			const moviePage = await data.text()
			const moviePageHtml = parse(moviePage)
			const image = moviePageHtml.querySelector('img.ipc-image')

			if (!image) {
				throw error(400, {
					message: 'Something went wrong fetching the image.'
				})
			}

			return {
				title: title.text,
				year: year.text,
				rating: rating.text,
				image: image.getAttribute('src')
			}
		})
	)

	return { popularMovies }
}
