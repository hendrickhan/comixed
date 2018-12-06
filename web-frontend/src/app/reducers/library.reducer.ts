/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2018, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.package
 * org.comixed;
 */

import { Action } from '@ngrx/store';
import { Library } from '../models/library';
import { Comic } from '../models/comics/comic';
import * as LibraryActions from '../actions/library.actions';

const initial_state: Library = {
  busy: false,
  last_comic_date: '0',
  comics: [],
};

export function libraryReducer(
  state: Library = initial_state,
  action: LibraryActions.Actions,
) {
  switch (action.type) {
    case LibraryActions.LIBRARY_FETCH_LIBRARY_CHANGES:
      return {
        ...state,
        busy: true,
        latest_comic_update: action.payload.last_comic_date,
      };

    case LibraryActions.LIBRARY_MERGE_NEW_COMICS:
      const comics = state.comics.concat(action.payload.comics);
      let last_comic_date = '0';
      if (comics.length > 0) {
        last_comic_date = comics.reduce((last: Comic, current: Comic) => {
          const last_added_date = parseInt(last.added_date, 10);
          const curr_added_date = parseInt(current.added_date, 10);

          if (curr_added_date > last_added_date) {
            return current;
          } else {
            return last;
          }
        }).added_date;
      }
      return {
        ...state,
        busy: false,
        last_comic_date: last_comic_date,
        comics: comics,
      };

    case LibraryActions.LIBRARY_UPDATE_COMIC: {
      const index = state.comics.findIndex((comic: Comic) => {
        return comic.id === action.payload.id;
      });

      if (index !== -1) {
        state.comics[index] = action.payload;
      } else {
        console.log(`*** ERROR: DID NOT FIND COMIC: id=${action.payload.id}`);
      }

      return {
        ...state,
        comics: state.comics,
      };
    }

    case LibraryActions.LIBRARY_REMOVE_COMIC: {
      return {
        ...state,
        busy: true,
      };
    }

    case LibraryActions.LIBRARY_UPDATE_COMICS_REMOVE_COMIC: {
      const updated_comics = state.comics.filter(comic => comic.id !== action.payload.comic.id);
      return {
        ...state,
        busy: false,
        comics: updated_comics,
      };
    }

    case LibraryActions.LIBRARY_RESET:
      return {
        ...state,
        last_comic_date: '0',
        comics: [],
      };

    default:
      return state;
  }
}