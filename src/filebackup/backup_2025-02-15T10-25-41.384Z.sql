PGDMP     )        
            }            quizzs     12.22 (Debian 12.22-1.pgdg120+1)    15.10 (Debian 15.10-0+deb12u1) 1               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16587    quizzs    DATABASE     q   CREATE DATABASE quizzs WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE quizzs;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    8                        3079    18435 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false    8                       0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            +           1247    18447    questions_question_type_enum    TYPE     w   CREATE TYPE public.questions_question_type_enum AS ENUM (
    'multiple_choice',
    'drag_drop',
    'audio_guess'
);
 /   DROP TYPE public.questions_question_type_enum;
       public          postgres    false    8            .           1247    18454    users_role_enum    TYPE     Z   CREATE TYPE public.users_role_enum AS ENUM (
    'student',
    'teacher',
    'admin'
);
 "   DROP TYPE public.users_role_enum;
       public          postgres    false    8            �            1259    18461    answers    TABLE     E  CREATE TABLE public.answers (
    answer_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    answer_text text,
    is_correct boolean,
    reason text,
    submitted_at timestamp without time zone DEFAULT now() NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
    DROP TABLE public.answers;
       public         heap    postgres    false    2    8    8            �            1259    18470    audio_guesses    TABLE     �   CREATE TABLE public.audio_guesses (
    audio_guess_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correct_guess character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
 !   DROP TABLE public.audio_guesses;
       public         heap    postgres    false    2    8    8            �            1259    18475    classes    TABLE     �   CREATE TABLE public.classes (
    class_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    class_name character varying(100) NOT NULL
);
    DROP TABLE public.classes;
       public         heap    postgres    false    2    8    8            �            1259    18479    drag_drop_answers    TABLE     �   CREATE TABLE public.drag_drop_answers (
    "dragDropAnswer_id" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    correct_order json NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "questionQuestionId" uuid
);
 %   DROP TABLE public.drag_drop_answers;
       public         heap    postgres    false    2    8    8            �            1259    18487 	   questions    TABLE     F  CREATE TABLE public.questions (
    question_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    question_text text NOT NULL,
    question_type public.questions_question_type_enum NOT NULL,
    media_url character varying(255),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "quizzQuizzId" uuid
);
    DROP TABLE public.questions;
       public         heap    postgres    false    2    8    555    8            �            1259    18495    quizzes    TABLE     z  CREATE TABLE public.quizzes (
    quizz_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    article text,
    "time" integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "userUserId" uuid,
    "classClassId" uuid,
    "subjectSubjectId" uuid,
    "resultsResultId" uuid
);
    DROP TABLE public.quizzes;
       public         heap    postgres    false    2    8    8            �            1259    18503    results    TABLE     )  CREATE TABLE public.results (
    result_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    score numeric(5,2) NOT NULL,
    completed_at timestamp without time zone DEFAULT now() NOT NULL,
    answer_ids json,
    "userUserId" uuid,
    "subjectSubjectId" uuid,
    "quizzesQuizzId" uuid
);
    DROP TABLE public.results;
       public         heap    postgres    false    2    8    8            �            1259    18511    subjects    TABLE     �   CREATE TABLE public.subjects (
    subject_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    subject_name character varying(100) NOT NULL
);
    DROP TABLE public.subjects;
       public         heap    postgres    false    2    8    8            �            1259    18515    users    TABLE     �  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying NOT NULL,
    role public.users_role_enum NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    refresh_token character varying,
    code_otp character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    "classClassId" uuid
);
    DROP TABLE public.users;
       public         heap    postgres    false    2    8    558    8                      0    18461    answers 
   TABLE DATA           }   COPY public.answers (answer_id, answer_text, is_correct, reason, submitted_at, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    203   *D                 0    18470    audio_guesses 
   TABLE DATA           h   COPY public.audio_guesses (audio_guess_id, correct_guess, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    204   �S                 0    18475    classes 
   TABLE DATA           7   COPY public.classes (class_id, class_name) FROM stdin;
    public          postgres    false    205   �S                 0    18479    drag_drop_answers 
   TABLE DATA           q   COPY public.drag_drop_answers ("dragDropAnswer_id", correct_order, created_at, "questionQuestionId") FROM stdin;
    public          postgres    false    206   �T       	          0    18487 	   questions 
   TABLE DATA           u   COPY public.questions (question_id, question_text, question_type, media_url, created_at, "quizzQuizzId") FROM stdin;
    public          postgres    false    207   �T       
          0    18495    quizzes 
   TABLE DATA           �   COPY public.quizzes (quizz_id, title, description, article, "time", created_at, "userUserId", "classClassId", "subjectSubjectId", "resultsResultId") FROM stdin;
    public          postgres    false    208   t[                 0    18503    results 
   TABLE DATA           �   COPY public.results (result_id, score, completed_at, answer_ids, "userUserId", "subjectSubjectId", "quizzesQuizzId") FROM stdin;
    public          postgres    false    209   �]                 0    18511    subjects 
   TABLE DATA           <   COPY public.subjects (subject_id, subject_name) FROM stdin;
    public          postgres    false    210   t^                 0    18515    users 
   TABLE DATA           �   COPY public.users (user_id, username, email, password, role, "isActive", refresh_token, code_otp, created_at, "classClassId") FROM stdin;
    public          postgres    false    211   `       n           2606    18525 &   classes PK_1c29abc497051d41c2d6e276a05 
   CONSTRAINT     l   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "PK_1c29abc497051d41c2d6e276a05" PRIMARY KEY (class_id);
 R   ALTER TABLE ONLY public.classes DROP CONSTRAINT "PK_1c29abc497051d41c2d6e276a05";
       public            postgres    false    205            x           2606    18527 '   subjects PK_3573ed298f466a8ba663579e077 
   CONSTRAINT     o   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT "PK_3573ed298f466a8ba663579e077" PRIMARY KEY (subject_id);
 S   ALTER TABLE ONLY public.subjects DROP CONSTRAINT "PK_3573ed298f466a8ba663579e077";
       public            postgres    false    210            v           2606    18529 &   results PK_3c8f50c2bb1131ae2acc86bb48e 
   CONSTRAINT     m   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "PK_3c8f50c2bb1131ae2acc86bb48e" PRIMARY KEY (result_id);
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "PK_3c8f50c2bb1131ae2acc86bb48e";
       public            postgres    false    209            p           2606    18531 0   drag_drop_answers PK_6dd6fbefb8f3c518a396caba519 
   CONSTRAINT     �   ALTER TABLE ONLY public.drag_drop_answers
    ADD CONSTRAINT "PK_6dd6fbefb8f3c518a396caba519" PRIMARY KEY ("dragDropAnswer_id");
 \   ALTER TABLE ONLY public.drag_drop_answers DROP CONSTRAINT "PK_6dd6fbefb8f3c518a396caba519";
       public            postgres    false    206            r           2606    18533 (   questions PK_8e940ecc478000e09fa8b008ec6 
   CONSTRAINT     q   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "PK_8e940ecc478000e09fa8b008ec6" PRIMARY KEY (question_id);
 T   ALTER TABLE ONLY public.questions DROP CONSTRAINT "PK_8e940ecc478000e09fa8b008ec6";
       public            postgres    false    207            z           2606    18535 $   users PK_96aac72f1574b88752e9fb00089 
   CONSTRAINT     i   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY (user_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089";
       public            postgres    false    211            t           2606    18537 &   quizzes PK_b7d4aa6b41f9d06330dcf7695e3 
   CONSTRAINT     l   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_b7d4aa6b41f9d06330dcf7695e3" PRIMARY KEY (quizz_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "PK_b7d4aa6b41f9d06330dcf7695e3";
       public            postgres    false    208            j           2606    18539 &   answers PK_cb080abe9c2f19dc80f9563bf50 
   CONSTRAINT     m   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "PK_cb080abe9c2f19dc80f9563bf50" PRIMARY KEY (answer_id);
 R   ALTER TABLE ONLY public.answers DROP CONSTRAINT "PK_cb080abe9c2f19dc80f9563bf50";
       public            postgres    false    203            l           2606    18541 ,   audio_guesses PK_fc2c8e780e4a2be2d3fb86a3800 
   CONSTRAINT     x   ALTER TABLE ONLY public.audio_guesses
    ADD CONSTRAINT "PK_fc2c8e780e4a2be2d3fb86a3800" PRIMARY KEY (audio_guess_id);
 X   ALTER TABLE ONLY public.audio_guesses DROP CONSTRAINT "PK_fc2c8e780e4a2be2d3fb86a3800";
       public            postgres    false    204            {           2606    18542 &   answers FK_1a8f790e4bd5cad9c0c80a17141    FK CONSTRAINT     �   ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "FK_1a8f790e4bd5cad9c0c80a17141" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.answers DROP CONSTRAINT "FK_1a8f790e4bd5cad9c0c80a17141";
       public          postgres    false    207    2930    203            �           2606    18547 &   results FK_1f731e01e0e2fd0a18beeb71115    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_1f731e01e0e2fd0a18beeb71115" FOREIGN KEY ("quizzesQuizzId") REFERENCES public.quizzes(quizz_id);
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_1f731e01e0e2fd0a18beeb71115";
       public          postgres    false    2932    208    209            |           2606    18552 ,   audio_guesses FK_20ea6e0eaf46179e3f6d057ebca    FK CONSTRAINT     �   ALTER TABLE ONLY public.audio_guesses
    ADD CONSTRAINT "FK_20ea6e0eaf46179e3f6d057ebca" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.audio_guesses DROP CONSTRAINT "FK_20ea6e0eaf46179e3f6d057ebca";
       public          postgres    false    207    2930    204                       2606    18557 &   quizzes FK_238d287ac529e65d6486fdf199d    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_238d287ac529e65d6486fdf199d" FOREIGN KEY ("classClassId") REFERENCES public.classes(class_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_238d287ac529e65d6486fdf199d";
       public          postgres    false    2926    208    205            }           2606    18562 0   drag_drop_answers FK_26c8ddf89c0e03b627b9d96d738    FK CONSTRAINT     �   ALTER TABLE ONLY public.drag_drop_answers
    ADD CONSTRAINT "FK_26c8ddf89c0e03b627b9d96d738" FOREIGN KEY ("questionQuestionId") REFERENCES public.questions(question_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.drag_drop_answers DROP CONSTRAINT "FK_26c8ddf89c0e03b627b9d96d738";
       public          postgres    false    206    207    2930            �           2606    18567 &   quizzes FK_3604c816e13d771e7fa8df6e5ca    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_3604c816e13d771e7fa8df6e5ca" FOREIGN KEY ("userUserId") REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_3604c816e13d771e7fa8df6e5ca";
       public          postgres    false    2938    208    211            ~           2606    18572 (   questions FK_8e693293995f0f807f22f86bd1c    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "FK_8e693293995f0f807f22f86bd1c" FOREIGN KEY ("quizzQuizzId") REFERENCES public.quizzes(quizz_id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.questions DROP CONSTRAINT "FK_8e693293995f0f807f22f86bd1c";
       public          postgres    false    2932    207    208            �           2606    18577 &   quizzes FK_9c542c3cd9489b9b0d3192f7b38    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_9c542c3cd9489b9b0d3192f7b38" FOREIGN KEY ("resultsResultId") REFERENCES public.results(result_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_9c542c3cd9489b9b0d3192f7b38";
       public          postgres    false    209    2934    208            �           2606    18582 $   users FK_aba130f16dcc9c7a5ba13712f36    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_aba130f16dcc9c7a5ba13712f36" FOREIGN KEY ("classClassId") REFERENCES public.classes(class_id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_aba130f16dcc9c7a5ba13712f36";
       public          postgres    false    211    205    2926            �           2606    18587 &   results FK_ca60ad9b3b31538111a39edb6df    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_ca60ad9b3b31538111a39edb6df" FOREIGN KEY ("userUserId") REFERENCES public.users(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_ca60ad9b3b31538111a39edb6df";
       public          postgres    false    209    2938    211            �           2606    18592 &   results FK_d2c15601f86021607bc3d0bebad    FK CONSTRAINT     �   ALTER TABLE ONLY public.results
    ADD CONSTRAINT "FK_d2c15601f86021607bc3d0bebad" FOREIGN KEY ("subjectSubjectId") REFERENCES public.subjects(subject_id);
 R   ALTER TABLE ONLY public.results DROP CONSTRAINT "FK_d2c15601f86021607bc3d0bebad";
       public          postgres    false    2936    210    209            �           2606    18597 &   quizzes FK_fbd22f76b3b55959b0d074de9d4    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_fbd22f76b3b55959b0d074de9d4" FOREIGN KEY ("subjectSubjectId") REFERENCES public.subjects(subject_id);
 R   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_fbd22f76b3b55959b0d074de9d4";
       public          postgres    false    210    208    2936               a  x��Z[oǕ~&E����Qݻ�o`�@�1�"��/U�]��5ME��7�nva,lE0�D��Rb�Iv���/��T�P��������3]�Su���wNuJ�N�q���Lk�kdÚ��ܚ�}�+o����v��U�����P�n\���J^��`Eri�L���u�׍i-���5խ�<{�tPX<Ԝy�"�Ͳ�։WC�)!Y�Lf�u���Z��4!�F{V.�����ޮ��٤J�PM�v�={ٜ��A7L&�tkYh�`�	�KB�\U��vUio�Vuc񬚍����l���O:z����;���xq��m��>��6:v�Iueq�����swBcL������o�u��_w�n��<����i7^��do�4��g���Z�e���f�i���G7�������U����jvm?��"��$_'�m��y^�ۯ�K��?����,`��Q��4�Ɓ�1fǸ�M����wF���_ɍ�,�Ƌg��������hj��r����ˉF#3��^�H�m�����Aڽ��NH�;�|{�_@�/���	D����B��xq7����n�c��}uc���s�_L2�r���6��ܥ������Ž������\�+7�J;+Nk2���D��6aGMdNk�r�B'z5�C��q]�L��<�Z�Z&���%����ü�W��8l��;�;<"k��`� ���:��Z ����L�Љ�dV���Z���x�x��z����5
#���en�5�,j��l���*�ZN��n��_��v�8��	�%�r|��Neq����� C��6��q4:�_<��չ����{����`g��d�su��`�Ne�WUp�D�3��E��6TtoN�V3�vIvK�ݺ �y2�nRt2�|S@ V�	P��Vq��wz�N����=�]���⋻�"�.�o&��_�p�4�X�oL2��l���♃`� y�³/'�M�d �K�^�GߚT/?��k>�����E"�)���d�� �{�)N��ys���4�Э�w����E� f�c ?,6:���ԏj��4�� 1�-1/Y�:�2{o8A�lqo������uU����`�h�Z8n[B�Z"���S\r�ƭ�ޛ�g�)�2�ѕռ�����	�fa
�ۛ����*��.,*�f0#el�����-��B�^�?��}̳ٛ̨��x+Zni}���(��
fR;����োoCu�BD���U�y�_uZ.�~`�9�]�����c&�:���LjM4�`Z33!���m�J�%��7�׮�C���$M�db�&�tj�u��4:����zC�8�<#,������%kD2�������t�_�Y}+�h�l,��,&s�8j]��Q��9ؔ�hc'1.����qR�6)0%�
 tnf,�S���h����dP�֑;�7#�m��R5���i����Yj��,}�ɚ�:���r�j�� 	�IL�lJ�֍́����~�!\Y�����kq�����==� �(���<���+�!�&�R�X-#U�V�q����}�q��W����_.�
V�pV�j�����\����{\[|��Ti��RX=~��x���&k���QP�]�����X�r<��N%ֱ�B(�� �.!�!`��d�A"ґ�	�!2��D���Z�w^�ӚR���1=�RE �X��2 �i��9&��a9�Ŝ����Nrfۤ%�Zh����R��xUت�>�x��mbQ�Z�Э��A	 �w�Me<��`	�yXj��2�g}��� �]��lW�������yOy.`(��˭�u��Zi����b|O���:X-t���O(ȍ�ȖO�yfx0�@��eP�a�HaW%|8)�ѓ�m@��M�K�_��8R#�b���Y�v,���|]MH��U|�F�P�!?�>d�-�d�Ð���yySru������Y���O�lcd2�� ��~	?��O�������T���K���OO�V�ucG �V��PS�M�Q[$*4��viU�Y�5�I�6.dgr+t�N�Pij8wMkt4�T*O��>,m��s�b��3Y!ݏЄ60B!A��`�h��%�[sD�r��͞1�5�K��m�`��92�D����5��E��;�����pyA�*��U��;�'ю��i(��f�]��G�+�{_b���ZA�)	��~V&.iA�Ƴ�ƁI�	��yޏ�%ˋ��P�B6�GJ����:ۄQGP�unF��|������	��L��P��6��7ޭ�I�Zi���6�`#��[߶����nPjt��_�4H9M =�&EhZ�\X�k"¡N�&o�Q��Nt��*�d®f֓wg��i��|V9)lkkr��ȟ�4*�d�5��m� �S�N�������B6��d�Ca(6S��~�Q!	=�$�ߤ���ա��(��''nR�������&cd�܁�F� ���yD�kS�5��j��Rk�x��-�XgJ�Ը&�B����ܜ,��7���lR�6g�0 ���9����J�=&S�&��p~�P������!ӧZ��"~ ,U0b<��n�9§ضU����n��U%�?!�z�Nh�<'8/�2�/S\E��I�w� ��/@�h&�s�������������Fg4���[8��aa������!q![���=��MјW���bn�*4e��Y�;�L+|����si���H��-7XG\ �|g���N�.1��IW��%��J�i���|�����Z�>��x���~\�$� �:J����͑l�Z'�o͎U|��<zE
�����?�f^�ن�r(�P�����,������A��[9F^�B��AF$�<0y<q��PI�Ї������Y�7�-:�?'����i�	����_ٟ���=ܱ����G��~���1�Z��{}qw^l��37�K��g��������T>-it%�ԚY�е'�*�C�q�EU��ǳ%��]C���ri����7.z��C�0���~�Ѿ�OO�?s1�~'k�֝���b�3���̀����_t��)��Ñޮ���ɁAc2{�s�����r����T���1k��� ���&�j)�m0�-�Vc9�����RkW��Ti��BH�Щ��iD�T2�Z������Ɖ��:�km�u@*�]�l�ޡE��VX��T����!�圽P)�:��0e2Uo%gQF�Ʀ�1ׁ��L�ϫ���WZ윹t��,��I&�U!�s@&����AsY.����9q�b� �-T�K���E��!(E���֍��	s4<j�VzP~ʙ�ː\���F��d�P�p5sI�q#%�Eò�c�90K��߂��[��y4�`Q/������1�W"��'^�ⷄG���/�w�t�Rr�f�5}��t��J�>���D�
T�������_�q�Q~0P������}�?	�J1��|�zM��zq�w�emA��&�y�=�h�̾Vz~k@�CsY�r��e�+a��_~��D�t%8{�d���7�o�a�L��{����r�w�|ߔ+fJhl/���k�j|ܿ�P�7(d���g���V>>�6���@i�˗��zo�PN�� �y1I�blu��I��{Jɣ�>��D$�u�,֦�Q,���KEna�E7�O��9�YÍ����[�kަ882���v�X˝#<��p�3%޴mR�N���Sj���ax������{�L��썭�?�ɵ1;���B�6��O�_�5_�\�<�v@�J!�j�e��VR{������b�k�'6܆X�+���E�8�ԤSQ� �/��雐�B�R G�+s�\P�X�fj-mj�۔�oȫJ�*,��ʻ
�z~N�P�|ѿYW-����=����Սr�8���_<#�<������UWp2!'xV�����,�sc��������Y            x������ � �         �   x�-�1N1@�zr�����8�SC��)i<�D4�R����do �RP���܄A��z��6-�	z�	�Y��Ѳbttn�)(J�;�����-&p�֊E����.T�����L�v����Km��[������r�3�����/Z�SG`�ދ���a�~��/O���p���0���*0[E(ҙI	۰�y������oB���C�            x������ � �      	   �  x��W]k�F}^��y����4}l��e4�V"�ڰ�L�J)�cJi�됚45q�@�.%r�l~I�i����kw�����s�u�����Z
\B�c%\�,��8��<<l�]��?W����h�|��ٴ��t��W���q��f�>=�m�^��x>n�*6�[^����z�c��f��I���93��XX�n
���k���~���&{�^>��	6b�
��k��>����̬����@o>�*}�uW���\/_��=b{e�Y|�ؤ��*�o�٬/'6�g�h�4%;X/��¢dB�>=z�v�ܵ7�4㺼?ξ7Ŵ4���wOx�����h��+�P��Dn�*�� ͹���'�
�4y��\%a�vT���C%��8Mx��.��Z�@����gX�Y՞N� 8{{v��u�W�%�<�Pa��4n0���+VQ=�.��_K$
1T�	�H�r�D�4=�\gY�}z<Ip����<W� ����1kJU}Ê)(7bl"Ss��T��Y�'��2�fE;g��r5�jS؅`	lO'�\/�j�'���TwX� �Ҳ��Yl�lTjK̒^���xu٠����yN�S���0�m�:���[:�M���m�;T��}��v0�fI&}�"9{�t�Ĉ2#�uI0�����W��Й�{װ	X@�S���+6#��`ʘTクdh����`7�P؂XWHbD�}B�Ԗ`�q��x^8|X��&K���b��m,�I��va�>���/����9�B�g���T���&����� ��~k<�Ӽ%�C�%���j���f�w��#	�{U�L�� ���"�"�S�w�.�q;?ܦ��PI'[}���*�W~*I_�'�	xI�����n�5XH�g8#�O�޽��Y4�ay���Oz�A@i��Ϻ2�i�1���sȲh�6�����ږq����V
��BB~��v@�B��1�����1����=����t�˶+��/0�g�X �3�|?��qG��q,������,���M�����!���w6� �=�6����(s|;pD}Z�>~67���a�ǃ(��H�Z��!*1<�n�C?H=%^��Ld&r�g<�EN��tA��K�h@�����[�L#���1�T����Z�>�s�e�t�I�]�66���ѧG�w<�5����J�U�P�?�� MU>0.fN3�x����
b�����n&x�b�����1��EpR�7q�� �#}���Q�!@i�u���/J���G۔o��}1�<7��vI�2��(�<�%*�s�#�I��rcL��wy�
*Q���@�_�ju���1����'��
�%�-h���I�P$�Z�2l��)�	�0��Y{v�dҞ6�r�q��q?��2����@SSφ����6�~Y�}�/�z}L��4��i\��l����@���0���!^�Jᢵ��@�q�qxP�+�W����g�pĊ����>�fz���L7���Q�g5I��3黾������l�<�P���K�'�-ϛ]�	i�k�D�Wu�s1��l��Qพ�ՖEY�Gq�9\EZ�8ІK�8�B/	���b3�#���%���� ��?;O�}�)�.~����o�#�jز�� b���M�u���F��V��W�z��&;ҍ�0�������@�c�      
   <  x����jA��=OQ/p��[��3#df� �����@E��V\��Bf��ED�nzك��o�1*H�@W���pn�wO�LȚ�0����@�ڀL5Uu�U7볾}ɎgsZ}{��g�r1c��n��W�CvԷ�;~��k�~���l�p�M����g�ۛ���OrT,u�l��[>cdԌ����ϋ�ӊL�6f���I��4ebĦ�ݻ)���K#��i�B3�F�.3D�H*	��H�gPEp�&�U2������*����9b �;k�<�&fo
�J���6ޕ`J��5Ӂ#gǓ� ���1A܈�2��"f������G���x�{ܯ>n~�'擾}����31;݂�uׁm(%o�qNx�����3�<��p���o��6:꽺<a����F������#���+�e#��@q[�xh�H$�RV%��Y�Z����z�!�����T��t	1q�x*J�������-�ZM�\R3���NY%��x�I���6F�����9�!�'��RLV/�eb7�A�J��CGw7N<*�"x�Z�FAt��W��L�U�����`0���J�         �   x�λ�1 �X[��9?"�VlE�_�m>x��~�a��3G�����ވ������[��~�Z��KG��p��Z茵��S��k+���'�@X;L���\{n�ƞD�\� {X��R���ic{� q��-At����	}������u��7�         �  x���=nA���S�
uWwuw݀�������  "�	��"AXr������P��3���ޫ9҈���s�� �	1�J�͋e_�����}��v=�LW���CE,�1P����
Z�qtnl.���[=�[~N[]>N����Ij}`���\�@k$&c�?oO���x?��N���v�Rdb�)8�r*�ٹ��G�SK}l.w�ᗈ�S�"�-q��v��8�z��6���G�or@
���v�ӯwrK���� ���	bD��轗����n=~�U.!ҙ��&'�=Q�F�ƖMO��/��ʷf=e�cH�ց�apqx��g����eF�\u=���w���NV;'�M(��`P���?J��R�7����         @  x���˲�8���=�Ӱs�꨽�xA4ԩ�B EQ���/�o�o��}����=:�V�$����2�nZ� �H"�ha�0 ��:�	������\�b����}�ҳ�/���?^�|���뭻t������)g���Uo��U\������˴�cP��T��N����ሧnj[��B��*�|��Y�b��lS"ı_�6!����� ��������U�̂t��;��ǟ�'m��gt+��iN���/ǣ�����C��QS�>�r(��~��%i��Ǔ���a��#e����+����#��Ib@��T�*j+P��"S�0Dz�����cĀ�tt+	"B׉�4��˫;�1���a��ש�I�.��q3ʆ��iV����h�;����U?��y>,ۚ�~��K�k�? A�>+t��@�<;�A��֐���㠡���;}G�o!��CM_nѸc(߯�
Q�vv,�=3��W��� �yT��M1M_���md�	�1"_�C3I"�� �P_ ���DF,"��.E�w��k��u3/_eݜ�����Y�)��R��d���ǀ�F�  ���Gq^�a;u7"��S#g���f�**���t���hxr�������#�@tW'��*F3��o�{ӥ}��SV�>9�.z �,y#����FH&�4]Ҡ"��'bV�!P�� 3�
BqlGo!��bC��%���@_<R�(�&����;"�n�v�Wk��b�� n�������x[�F�ò�X�F���x����?�Et�ސ�F��D��r���f��     