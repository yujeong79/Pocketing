package com.a406.pocketing.auth.dto.callback;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TwitterUserResponse {
    private TwitterUserData data;

    @Getter @Setter
    public static class TwitterUserData {
        private String id;
    }

}
