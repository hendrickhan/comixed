/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2019, The ComiXed Project.
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
 * along with this program. If not, see <http://www.gnu.org/licenses>
 */

package org.comixed.net;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SetBlockingStateRequest {
  @JsonProperty("hashes")
  private String[] hashes;

  @JsonProperty("blocked")
  private Boolean blocked;

  public SetBlockingStateRequest() {}

  public SetBlockingStateRequest(final String[] hashes, final Boolean blocked) {
    this.hashes = hashes;
    this.blocked = blocked;
  }

  public String[] getHashes() {
    return hashes;
  }

  public Boolean getBlocked() {
    return blocked;
  }
}
