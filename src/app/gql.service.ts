import { Injectable } from "@angular/core";
import { Apollo, gql } from 'apollo-angular';
import { FilterCheckboxOptions, FilterCheckboxEntry } from 'src/app/types';

const GET_POSTS_OF_AUTHOR = gql`
  query GetSmth($shipName: String!) {
    launchesPast(limit: 10, find: {ship: $shipName}) {
    mission_name
    ships {
      name
    }
  }
  }
`;

@Injectable({
    providedIn: 'root'
})
export class GqlService {
    constructor(private apollo: Apollo) { }
    filterVariants: FilterCheckboxOptions;
    shipName = "HA"
    enSearch = false
    setShipName(name: string) {
        this.shipName = name
        console.log(this.shipName)
    }

    getFilterVariants() {
        this.apollo
            .watchQuery({
                query: GET_POSTS_OF_AUTHOR,
                variables: {
                    shipName: this.shipName,
                    enSearch: this.enSearch
                },
            })
            .valueChanges.subscribe((result: any) => {
                this.filterVariants = result?.data?.ships;
                // this.loading = result.loading;
                // this.error = result.error;
                console.log(result?.data?.launchesPast?.map(entry => entry.mission_name))
            });
    }
}
