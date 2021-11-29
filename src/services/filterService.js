export class FilterService {

    static getFilter() {
        const filter = localStorage.getItem("filter")
        if (!filter) {
            return "ALL"
        }
        return filter
    }

    static setFilter(filter) {
        localStorage.setItem("filter", filter)
    }

    static filter(rssList) {
        const filter = this.getFilter()

        if (filter === "SAVED") {
            return rssList.filter(rss => rss.saved)
        }
        else if (filter === "UNSEEN") {
            return rssList.filter(rss=> !rss.viewed)
        }
        else {
            return rssList
        }
    }
}