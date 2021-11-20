import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


export default function Googlesignin() {
    const [user , setUser ] = useState({})
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"], // [Android] what API you want to access on behalf of the user, default is email and profile
            webClientId: '127952462237-pih04t9rmhaeodnm5qpov505v1nthcrc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            // hostedDomain: '', // specifies a hosted domain restriction
            // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            // accountName: '', // [Android] specifies an account name on the device that should be used
            // // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
            // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
            // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
          });
    }, [])
    // const signOut = async () => {
    //     try {
    //       await GoogleSignin.revokeAccess();
    //       await GoogleSignin.signOut();
    //     //   this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo)
          setUser(userInfo?.user)
        } catch (error) {
            console.log(error)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };
    return (
        <View style={{flex:1 , justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity onPress={signIn} style={{padding:16, backgroundColor:'green', borderRadius:12}}>
                <Text style={{color:'#ffffff'}}>Google Sign in</Text>
            </TouchableOpacity>
    <Text style={{color:'#000000'}}>{JSON.stringify(user)}</Text>
        </View>
    )
}
