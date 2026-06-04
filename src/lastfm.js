/*
 * Using https://github.com/biancarosa/lastfm-last-played
 */

const LastFMLastPlayedTranslationUnit = {
	"notPlaying": {
		"en": "Not Playing",
		"id": "Tidak Diputar",
		"ja": "プレイするしません"
	},
	"nowPlaying": {
		"en": "Now Playing",
		"id": "Lagi Diputar",
		"ja": "プレイします"
	},
	"unknownTitle": {
		"en": "No Title",
		"id": "Tidak Ada Judul",
		"ja": "???"
	}
}

export default class LastFMLastPlayed {
	constructor(userName, lang = "en") {
		this.userName = userName
		this.lang = lang
	}
	async init() {
		const response = await fetch(`https://lastfm-last-played.biancarosa.com.br/${this.userName}/latest-song`)
		this.data = await response.json()
		return this
	}
	getImage(size = "medium") {
		return (this.data === undefined) ? "" : this.data["track"]["image"].find((img) => img.size === size)["#text"]
	}
	getStatus() {
		if (this.data === undefined) {
			return this._geti8nValue("notPlaying")
		}
		if (this.data["track"]["@attr"] !== undefined) {
			return this._geti8nValue("nowPlaying")
		} else if (this.data["track"]["date"] !== undefined) {
			const unixTime = this.data["track"]["date"]["uts"]
			return new Date(unixTime * 1000).toLocaleString(this.lang)
		} else {
			return this._geti8nValue("notPlaying")
		}
		// return (this.data["track"]["@attr"]["nowplaying"]) ? this._geti8nValue("nowPlaying") : this._geti8nValue("notPlaying")
	}
	getTitle() {
		return (this.data === undefined) ? this._geti8nValue("unknownTitle") : this.data["track"]["name"]
	}
	getAlbum() {
		return (this.data === undefined) ? this._geti8nValue("unknownTitle") : this.data["track"]["name"]
	}
	getUrl() {
		return (this.data === undefined) ? "https://last.fm" : this.data["track"]["url"]
	}
	_geti8nValue(key) {
		return LastFMLastPlayedTranslationUnit[key][this.lang]
	}
}
