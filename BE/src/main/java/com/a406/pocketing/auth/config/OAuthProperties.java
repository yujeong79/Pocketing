package com.a406.pocketing.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "spring.security.oauth2.client")
public class OAuthProperties {

    private Registration registration;
    private Provider provider;

    @Getter @Setter
    public static class Registration {
        private Kakao kakao;
        private Twitter twitter;

        @Getter @Setter
        public static class Kakao {
            private String clientId;
            private String authorizationGrantType;
            private String redirectUri;
        }

        @Getter @Setter
        public static class Twitter {
            private String clientId;
            private String clientSecret;
            private String authorizationGrantType;
            private String redirectUri;
        }
    }

    @Getter @Setter
    public static class Provider {
        private Kakao kakao;
        private Twitter twitter;

        @Getter @Setter
        public static class Kakao {
            private String authorizationUri;
            private String tokenUri;
            private String userInfoUri;
        }

        @Getter @Setter
        public static class Twitter {
            private String authorizationUri;
            private String tokenUri;
            private String userInfoUri;
        }
    }

}
