import { View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import EmptyState from "../../components/EmptyState";
import {getUserPosts} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

import { useGlobalContext} from '../../context/GlobalProvider'
const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext()
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={ posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-sm font-pmedium text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">Aora</Text>

            <View className="mt-6 mb-8">
              {/* <SearchInput initialQuery={query} /> */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
